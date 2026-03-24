'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  updateSchedulingSettings,
  type SchedulingSettings as SchedulingSettingsType,
} from '@/app/actions/scheduling-settings';

interface SchedulingSettingsFormProps {
  settings: SchedulingSettingsType;
}

export default function SchedulingSettings({
  settings,
}: SchedulingSettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [calendlyUrl, setCalendlyUrl] = useState(settings.calendly_url ?? '');
  const [calendlyApiKey, setCalendlyApiKey] = useState(
    settings.calendly_api_key ?? '',
  );
  const [webhookSigningKey, setWebhookSigningKey] = useState(
    settings.calendly_webhook_signing_key ?? '',
  );
  const [reminderHours, setReminderHours] = useState(
    settings.reminder_hours_before,
  );
  const [confirmationEnabled, setConfirmationEnabled] = useState(
    settings.confirmation_email_enabled,
  );
  const [reminderEnabled, setReminderEnabled] = useState(
    settings.reminder_email_enabled,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    const result = await updateSchedulingSettings({
      calendly_url: calendlyUrl.trim() || undefined,
      calendly_api_key: calendlyApiKey.trim() || undefined,
      calendly_webhook_signing_key: webhookSigningKey.trim() || undefined,
      reminder_hours_before: reminderHours,
      confirmation_email_enabled: confirmationEnabled,
      reminder_email_enabled: reminderEnabled,
    });

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    router.refresh();
    setTimeout(() => setSuccess(false), 3000);
  };

  const fieldClasses =
    'w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-zen-blue/40 focus:border-zen-blue transition-colors';
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-700">
          Settings saved successfully.
        </div>
      )}

      {/* Calendly Integration */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Calendly Integration
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="calendlyUrl" className={labelClasses}>
              Calendly Scheduling URL
            </label>
            <input
              id="calendlyUrl"
              type="url"
              value={calendlyUrl}
              onChange={(e) => setCalendlyUrl(e.target.value)}
              className={fieldClasses}
              placeholder="https://calendly.com/your-username"
            />
            <p className="text-xs text-gray-500 mt-1">
              This URL will be embedded on the public /book page.
            </p>
          </div>

          <div>
            <label htmlFor="calendlyApiKey" className={labelClasses}>
              Calendly Personal Access Token
            </label>
            <input
              id="calendlyApiKey"
              type="password"
              value={calendlyApiKey}
              onChange={(e) => setCalendlyApiKey(e.target.value)}
              className={fieldClasses}
              placeholder="Enter your Calendly API token"
            />
            <p className="text-xs text-gray-500 mt-1">
              Used for cancelling Calendly appointments from the admin panel.
              Get one at{' '}
              <a
                href="https://calendly.com/integrations/api_webhooks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                calendly.com/integrations/api_webhooks
              </a>
            </p>
          </div>

          <div>
            <label htmlFor="webhookSigningKey" className={labelClasses}>
              Webhook Signing Key
            </label>
            <input
              id="webhookSigningKey"
              type="password"
              value={webhookSigningKey}
              onChange={(e) => setWebhookSigningKey(e.target.value)}
              className={fieldClasses}
              placeholder="Webhook signing key from Calendly"
            />
            <p className="text-xs text-gray-500 mt-1">
              Used to verify incoming webhook requests from Calendly. Configure
              your webhook URL as:{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                {typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}
                /api/calendly/webhook
              </code>
            </p>
          </div>
        </div>
      </section>

      {/* Email Preferences */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Email Notifications
        </h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmationEnabled}
              onChange={(e) => setConfirmationEnabled(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-zen-blue focus:ring-zen-blue/40"
            />
            <div>
              <span className="text-sm font-medium text-gray-900">
                Confirmation emails
              </span>
              <p className="text-xs text-gray-500">
                Send a confirmation email when a new appointment is booked via
                Calendly.
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={reminderEnabled}
              onChange={(e) => setReminderEnabled(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-zen-blue focus:ring-zen-blue/40"
            />
            <div>
              <span className="text-sm font-medium text-gray-900">
                Reminder emails
              </span>
              <p className="text-xs text-gray-500">
                Send a reminder email before upcoming appointments.
              </p>
            </div>
          </label>

          <div>
            <label htmlFor="reminderHours" className={labelClasses}>
              Reminder time (hours before appointment)
            </label>
            <input
              id="reminderHours"
              type="number"
              min={1}
              max={168}
              value={reminderHours}
              onChange={(e) => setReminderHours(Number(e.target.value))}
              className={`${fieldClasses} max-w-[120px]`}
            />
          </div>
        </div>
      </section>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-medium rounded-lg bg-zen-blue text-white hover:bg-zen-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
