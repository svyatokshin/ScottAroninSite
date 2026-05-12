import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { createServiceRoleClient } from '@/lib/supabase/service-role';
import { getStripeServerClient } from '@/lib/stripe/server';

export const runtime = 'nodejs';

function getBaseUrl(originHeader: string | null) {
  if (originHeader) return originHeader;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return 'http://localhost:3000';
}

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'You need to sign in first.' }, { status: 401 });
    }

    const serviceRole = createServiceRoleClient();
    const { data: subscription } = await serviceRole
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ error: 'No Stripe customer found for this account.' }, { status: 400 });
    }

    const requestHeaders = await headers();
    const baseUrl = getBaseUrl(requestHeaders.get('origin'));
    const stripe = getStripeServerClient();

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${baseUrl}/dashboard/account`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create billing portal session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
