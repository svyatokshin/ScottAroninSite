'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSupabase } from '@/lib/auth/master';

export interface SchedulingSettings {
  id: string;
  calendly_url: string | null;
  calendly_api_key: string | null;
  calendly_webhook_signing_key: string | null;
  reminder_hours_before: number;
  confirmation_email_enabled: boolean;
  reminder_email_enabled: boolean;
  updated_at: string;
}

export interface SchedulingSettingsInput {
  calendly_url?: string;
  calendly_api_key?: string;
  calendly_webhook_signing_key?: string;
  reminder_hours_before?: number;
  confirmation_email_enabled?: boolean;
  reminder_email_enabled?: boolean;
}

export async function getSchedulingSettings(): Promise<{
  data?: SchedulingSettings;
  error?: string;
}> {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { data, error } = await auth.supabase
    .from('scheduling_settings')
    .select('*')
    .limit(1)
    .single();

  if (error) return { error: error.message };
  return { data: data as SchedulingSettings };
}

export async function updateSchedulingSettings(input: SchedulingSettingsInput) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { data: existing } = await auth.supabase
    .from('scheduling_settings')
    .select('id')
    .limit(1)
    .single();

  const payload = {
    calendly_url: input.calendly_url ?? null,
    calendly_api_key: input.calendly_api_key ?? null,
    calendly_webhook_signing_key: input.calendly_webhook_signing_key ?? null,
    reminder_hours_before: input.reminder_hours_before ?? 24,
    confirmation_email_enabled: input.confirmation_email_enabled ?? true,
    reminder_email_enabled: input.reminder_email_enabled ?? true,
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    const { error } = await auth.supabase
      .from('scheduling_settings')
      .update(payload)
      .eq('id', existing.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await auth.supabase
      .from('scheduling_settings')
      .insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath('/admin/scheduling');
  revalidatePath('/admin/scheduling/settings');
  revalidatePath('/book');
  return {};
}
