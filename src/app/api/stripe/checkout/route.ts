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

    const priceId = process.env.STRIPE_PREMIUM_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: 'Missing STRIPE_PREMIUM_PRICE_ID' }, { status: 500 });
    }

    const stripe = getStripeServerClient();
    const serviceRole = createServiceRoleClient();

    const { data: existingSubscription } = await serviceRole
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    let customerId = existingSubscription?.stripe_customer_id ?? null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await serviceRole.from('user_subscriptions').upsert(
        {
          user_id: user.id,
          stripe_customer_id: customerId,
          status: 'inactive',
        },
        { onConflict: 'user_id' }
      );
    }

    const requestHeaders = await headers();
    const origin = requestHeaders.get('origin');
    const baseUrl = getBaseUrl(origin);

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      client_reference_id: user.id,
      allow_promotion_codes: true,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/pricing?success=1`,
      cancel_url: `${baseUrl}/pricing?canceled=1`,
      metadata: { supabase_user_id: user.id },
      subscription_data: {
        metadata: { supabase_user_id: user.id },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
