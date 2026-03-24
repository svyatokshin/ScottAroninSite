import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import SchedulingSettings from '@/components/admin/SchedulingSettings';
import type { SchedulingSettings as SchedulingSettingsType } from '@/app/actions/scheduling-settings';

export default async function SchedulingSettingsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('scheduling_settings')
    .select('*')
    .limit(1)
    .single();

  const settings: SchedulingSettingsType = data ?? {
    id: '',
    calendly_url: null,
    calendly_api_key: null,
    calendly_webhook_signing_key: null,
    reminder_hours_before: 24,
    confirmation_email_enabled: true,
    reminder_email_enabled: true,
    updated_at: new Date().toISOString(),
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/scheduling"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          &larr; Back to Scheduling
        </Link>
      </div>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
        Scheduling Settings
      </h1>
      <SchedulingSettings settings={settings} />
    </div>
  );
}
