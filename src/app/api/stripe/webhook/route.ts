import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripeServerClient } from '@/lib/stripe/server';
import { createServiceRoleClient } from '@/lib/supabase/service-role';

export const runtime = 'nodejs';

function toIsoFromUnix(timestamp?: number | null) {
  if (!timestamp) return null;
  return new Date(timestamp * 1000).toISOString();
}

async function upsertSubscriptionFromStripe(
  subscription: Stripe.Subscription,
  fallbackUserId?: string | null
) {
  const serviceRole = createServiceRoleClient();
  const stripeCustomerId = String(subscription.customer);
  const stripePriceId = subscription.items.data[0]?.price?.id ?? null;
  const supabaseUserId = subscription.metadata?.supabase_user_id ?? fallbackUserId ?? null;

  if (!supabaseUserId) {
    const { data: existingByCustomer } = await serviceRole
      .from('user_subscriptions')
      .select('user_id')
      .eq('stripe_customer_id', stripeCustomerId)
      .maybeSingle();

    if (!existingByCustomer?.user_id) return;

    await serviceRole.from('user_subscriptions').upsert(
      {
        user_id: existingByCustomer.user_id,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: subscription.id,
        stripe_price_id: stripePriceId,
        status: subscription.status,
        current_period_end: toIsoFromUnix(subscription.current_period_end),
        cancel_at_period_end: subscription.cancel_at_period_end ?? false,
      },
      { onConflict: 'user_id' }
    );
    return;
  }

  await serviceRole.from('user_subscriptions').upsert(
    {
      user_id: supabaseUserId,
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: subscription.id,
      stripe_price_id: stripePriceId,
      status: subscription.status,
      current_period_end: toIsoFromUnix(subscription.current_period_end),
      cancel_at_period_end: subscription.cancel_at_period_end ?? false,
    },
    { onConflict: 'user_id' }
  );
}

async function markSubscriptionCanceled(subscription: Stripe.Subscription) {
  const serviceRole = createServiceRoleClient();
  const stripeCustomerId = String(subscription.customer);

  const { data: existingSubscription } = await serviceRole
    .from('user_subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', subscription.id)
    .maybeSingle();

  if (existingSubscription?.user_id) {
    await serviceRole
      .from('user_subscriptions')
      .update({
        status: 'canceled',
        cancel_at_period_end: false,
        current_period_end: toIsoFromUnix(subscription.current_period_end),
      })
      .eq('user_id', existingSubscription.user_id);
    return;
  }

  await serviceRole
    .from('user_subscriptions')
    .update({
      status: 'canceled',
      cancel_at_period_end: false,
      current_period_end: toIsoFromUnix(subscription.current_period_end),
    })
    .eq('stripe_customer_id', stripeCustomerId);
}

export async function POST(request: Request) {
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeWebhookSecret) {
    return NextResponse.json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 });
  }

  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    const stripe = getStripeServerClient();
    const event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(String(session.subscription));
          await upsertSubscriptionFromStripe(subscription, session.client_reference_id);
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await upsertSubscriptionFromStripe(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await markSubscriptionCanceled(subscription);
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook handling failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
