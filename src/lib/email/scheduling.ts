import { Resend } from 'resend';

interface AppointmentEmailData {
  client_name: string | null;
  client_email: string | null;
  title: string;
  start_time: string;
  end_time: string;
  notes?: string | null;
}

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

function baseHtml(title: string, body: string): string {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #9DD0EB, #8FC5E0); padding: 32px 24px; text-align: center;">
        <h1 style="color: #1a1a1a; font-size: 24px; font-weight: 300; margin: 0;">${title}</h1>
      </div>
      <div style="padding: 32px 24px;">
        ${body}
      </div>
      <div style="border-top: 1px solid #e5e7eb; padding: 24px; text-align: center;">
        <p style="color: #6b7280; font-size: 13px; margin: 0;">Scott Aronin Wellness</p>
      </div>
    </div>
  `;
}

function appointmentDetailsBlock(appt: AppointmentEmailData): string {
  return `
    <div style="background: #f9fafb; border-left: 4px solid #3498DB; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
      <p style="margin: 0 0 8px; font-weight: 600; color: #1a1a1a;">${appt.title}</p>
      <p style="margin: 0 0 4px; color: #374151;"><strong>Date &amp; Time:</strong> ${formatDateTime(appt.start_time)}</p>
      <p style="margin: 0 0 4px; color: #374151;"><strong>End:</strong> ${formatDateTime(appt.end_time)}</p>
      ${appt.notes ? `<p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;"><em>${appt.notes}</em></p>` : ''}
    </div>
  `;
}

export async function sendConfirmationEmail(
  appt: AppointmentEmailData,
): Promise<{ success: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) return { success: false, error: 'RESEND_API_KEY not configured' };
  if (!appt.client_email) return { success: false, error: 'No client email' };

  const clientName = appt.client_name || 'there';
  const html = baseHtml(
    'Appointment Confirmed',
    `
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Hi ${clientName},
      </p>
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Your appointment has been confirmed. Here are the details:
      </p>
      ${appointmentDetailsBlock(appt)}
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        If you need to reschedule or cancel, please reply to this email or contact us directly.
      </p>
    `,
  );

  try {
    const { error } = await resend.emails.send({
      from: 'Appointments <onboarding@resend.dev>',
      to: [appt.client_email],
      subject: `Appointment Confirmed: ${appt.title}`,
      html,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function sendReminderEmail(
  appt: AppointmentEmailData,
): Promise<{ success: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) return { success: false, error: 'RESEND_API_KEY not configured' };
  if (!appt.client_email) return { success: false, error: 'No client email' };

  const clientName = appt.client_name || 'there';
  const html = baseHtml(
    'Appointment Reminder',
    `
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Hi ${clientName},
      </p>
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        This is a friendly reminder about your upcoming appointment:
      </p>
      ${appointmentDetailsBlock(appt)}
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        We look forward to seeing you! If you need to make any changes, please reply to this email.
      </p>
    `,
  );

  try {
    const { error } = await resend.emails.send({
      from: 'Appointments <onboarding@resend.dev>',
      to: [appt.client_email],
      subject: `Reminder: ${appt.title} - ${formatDateTime(appt.start_time)}`,
      html,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
