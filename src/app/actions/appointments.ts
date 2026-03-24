'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSupabase } from '@/lib/auth/master';

export interface AppointmentInput {
  title: string;
  client_name?: string;
  client_email?: string;
  start_time: string;
  end_time: string;
  status?: 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  source?: 'calendly' | 'manual';
  calendly_event_uri?: string;
  calendly_invitee_uri?: string;
}

export interface AppointmentFilters {
  status?: string;
  from?: string;
  to?: string;
}

export interface Appointment {
  id: string;
  title: string;
  client_name: string | null;
  client_email: string | null;
  start_time: string;
  end_time: string;
  status: string;
  notes: string | null;
  calendly_event_uri: string | null;
  calendly_invitee_uri: string | null;
  source: string;
  reminder_sent: boolean;
  created_at: string;
  updated_at: string;
}

const REVALIDATE_PATHS = ['/admin/scheduling', '/admin'];

function revalidateScheduling() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

export async function getAppointments(
  filters?: AppointmentFilters,
): Promise<{ data?: Appointment[]; error?: string }> {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  let query = auth.supabase
    .from('appointments')
    .select('*')
    .order('start_time', { ascending: true });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.from) {
    query = query.gte('start_time', filters.from);
  }
  if (filters?.to) {
    query = query.lte('start_time', filters.to);
  }

  const { data, error } = await query;
  if (error) return { error: error.message };
  return { data: data as Appointment[] };
}

export async function getAppointment(
  id: string,
): Promise<{ data?: Appointment; error?: string }> {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { data, error } = await auth.supabase
    .from('appointments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return { error: error.message };
  return { data: data as Appointment };
}

export async function createAppointment(input: AppointmentInput) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { data, error } = await auth.supabase
    .from('appointments')
    .insert({
      title: input.title,
      client_name: input.client_name ?? null,
      client_email: input.client_email ?? null,
      start_time: input.start_time,
      end_time: input.end_time,
      status: input.status ?? 'confirmed',
      notes: input.notes ?? null,
      source: input.source ?? 'manual',
      calendly_event_uri: input.calendly_event_uri ?? null,
      calendly_invitee_uri: input.calendly_invitee_uri ?? null,
      updated_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (error) return { error: error.message };
  revalidateScheduling();
  return { data: { id: data.id } };
}

export async function updateAppointment(id: string, input: AppointmentInput) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { error } = await auth.supabase
    .from('appointments')
    .update({
      title: input.title,
      client_name: input.client_name ?? null,
      client_email: input.client_email ?? null,
      start_time: input.start_time,
      end_time: input.end_time,
      status: input.status ?? 'confirmed',
      notes: input.notes ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) return { error: error.message };
  revalidateScheduling();
  return {};
}

export async function deleteAppointment(id: string) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { error } = await auth.supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) return { error: error.message };
  revalidateScheduling();
  return {};
}

export async function cancelAppointment(id: string) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { data: appointment } = await auth.supabase
    .from('appointments')
    .select('calendly_event_uri, calendly_invitee_uri')
    .eq('id', id)
    .single();

  if (appointment?.calendly_invitee_uri) {
    const { data: settings } = await auth.supabase
      .from('scheduling_settings')
      .select('calendly_api_key')
      .limit(1)
      .single();

    if (settings?.calendly_api_key) {
      try {
        await fetch(appointment.calendly_invitee_uri, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${settings.calendly_api_key}`,
            'Content-Type': 'application/json',
          },
        });
      } catch {
        // Calendly cancel failed but we still cancel locally
      }
    }
  }

  const { error } = await auth.supabase
    .from('appointments')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: error.message };
  revalidateScheduling();
  return {};
}
