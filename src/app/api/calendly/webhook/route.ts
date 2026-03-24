import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendConfirmationEmail } from '@/lib/email/scheduling';

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function verifySignature(
  body: string,
  signature: string | null,
  signingKey: string | null,
): Promise<boolean> {
  if (!signingKey || !signature) return !signingKey;

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(signingKey),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
    const computed = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return computed === signature;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  }

  const rawBody = await request.text();

  const { data: settings } = await supabase
    .from('scheduling_settings')
    .select('calendly_webhook_signing_key, confirmation_email_enabled')
    .limit(1)
    .single();

  const signature = request.headers.get('calendly-webhook-signature');
  const isValid = await verifySignature(
    rawBody,
    signature,
    settings?.calendly_webhook_signing_key ?? null,
  );

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const event = payload.event as string | undefined;
  const eventPayload = payload.payload as Record<string, unknown> | undefined;

  if (!event || !eventPayload) {
    return NextResponse.json({ error: 'Missing event data' }, { status: 400 });
  }

  if (event === 'invitee.created') {
    const invitee = eventPayload as Record<string, unknown>;
    const scheduledEvent = invitee.scheduled_event as Record<string, unknown> | undefined;

    const clientName = invitee.name as string | undefined;
    const clientEmail = invitee.email as string | undefined;
    const eventUri = scheduledEvent?.uri as string | undefined;
    const inviteeUri = invitee.uri as string | undefined;
    const startTime = scheduledEvent?.start_time as string | undefined;
    const endTime = scheduledEvent?.end_time as string | undefined;
    const eventName = scheduledEvent?.name as string | undefined;

    if (!startTime || !endTime) {
      return NextResponse.json({ error: 'Missing time data' }, { status: 400 });
    }

    const { error } = await supabase.from('appointments').insert({
      title: eventName || 'Calendly Appointment',
      client_name: clientName ?? null,
      client_email: clientEmail ?? null,
      start_time: startTime,
      end_time: endTime,
      status: 'confirmed',
      source: 'calendly',
      calendly_event_uri: eventUri ?? null,
      calendly_invitee_uri: inviteeUri ?? null,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Failed to insert appointment:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (settings?.confirmation_email_enabled && clientEmail) {
      await sendConfirmationEmail({
        client_name: clientName ?? null,
        client_email: clientEmail,
        title: eventName || 'Calendly Appointment',
        start_time: startTime,
        end_time: endTime,
      });
    }

    return NextResponse.json({ ok: true });
  }

  if (event === 'invitee.canceled') {
    const invitee = eventPayload as Record<string, unknown>;
    const inviteeUri = invitee.uri as string | undefined;

    if (inviteeUri) {
      await supabase
        .from('appointments')
        .update({ status: 'cancelled', updated_at: new Date().toISOString() })
        .eq('calendly_invitee_uri', inviteeUri);
    }

    return NextResponse.json({ ok: true });
  }

  // Unhandled event type — acknowledge receipt
  return NextResponse.json({ ok: true });
}
