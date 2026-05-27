import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendReminderEmail } from '@/lib/email/scheduling';

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  }

  const { data: settings } = await supabase
    .from('scheduling_settings')
    .select('reminder_hours_before, reminder_email_enabled')
    .limit(1)
    .single();

  if (!settings?.reminder_email_enabled) {
    return NextResponse.json({ message: 'Reminders disabled', sent: 0 });
  }

  const hoursBeforeMs = (settings.reminder_hours_before ?? 24) * 60 * 60 * 1000;
  const now = new Date();
  const windowEnd = new Date(now.getTime() + hoursBeforeMs);

  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('status', 'confirmed')
    .eq('reminder_sent', false)
    .gte('start_time', now.toISOString())
    .lte('start_time', windowEnd.toISOString());

  if (error) {
    console.error('Failed to query appointments for reminders:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  let sent = 0;
  for (const appt of appointments ?? []) {
    if (!appt.client_email) continue;

    const result = await sendReminderEmail({
      client_name: appt.client_name,
      client_email: appt.client_email,
      title: appt.title,
      start_time: appt.start_time,
      end_time: appt.end_time,
      notes: appt.notes,
    });

    if (result.success) {
      await supabase
        .from('appointments')
        .update({ reminder_sent: true })
        .eq('id', appt.id);
      sent++;
    }
  }

  return NextResponse.json({ message: 'Reminders processed', sent });
}
