import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

const ACTIVE_SUBSCRIPTION_STATUSES = new Set(['active', 'trialing']);

export interface UserSubscription {
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

export interface SubscriptionState {
  subscription: UserSubscription | null;
  hasActiveSubscription: boolean;
}

function isSubscriptionActive(subscription: UserSubscription | null) {
  if (!subscription) return false;
  if (!ACTIVE_SUBSCRIPTION_STATUSES.has(subscription.status)) return false;
  if (!subscription.current_period_end) return true;
  return new Date(subscription.current_period_end).getTime() > Date.now();
}

export async function getSubscriptionStateForUser(
  userId: string,
  supabaseClient?: SupabaseClient
): Promise<SubscriptionState> {
  const supabase = supabaseClient ?? (await createClient());

  const { data: subscription } = await supabase
    .from('user_subscriptions')
    .select('user_id, stripe_customer_id, stripe_subscription_id, stripe_price_id, status, current_period_end, cancel_at_period_end')
    .eq('user_id', userId)
    .maybeSingle();

  const normalized = subscription as UserSubscription | null;
  return {
    subscription: normalized,
    hasActiveSubscription: isSubscriptionActive(normalized),
  };
}
