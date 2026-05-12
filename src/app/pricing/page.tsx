import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getSubscriptionStateForUser } from '@/lib/subscription';
import SubscriptionButton from '@/components/subscription/SubscriptionButton';

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  const { success, canceled } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const subscriptionState = user
    ? await getSubscriptionStateForUser(user.id, supabase)
    : null;
  const hasActiveSubscription = subscriptionState?.hasActiveSubscription ?? false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgLight-4 via-bgLight-4 to-bgLight-3 py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-3 text-center font-playfair text-4xl font-light text-gray-900 sm:text-5xl">
          Premium Membership
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-center text-gray-700">
          Unlock the full course library with one monthly subscription. Every account
          keeps access to free video content in the dashboard.
        </p>

        {success === '1' && (
          <p className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Payment successful. Your premium access is being activated.
          </p>
        )}
        {canceled === '1' && (
          <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Checkout canceled. You can try again whenever you&apos;re ready.
          </p>
        )}

        <div className="rounded-2xl border border-bgDark-2/20 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-sm uppercase tracking-wide text-gray-500">Premium</p>
          <h2 className="mt-2 text-3xl font-semibold text-gray-900">$99/month</h2>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li>Full access to all premium course lessons and materials</li>
            <li>Audio/video course media and lesson quizzes</li>
            <li>Subscription management through Stripe customer portal</li>
            <li>Free dashboard videos remain available for all users</li>
          </ul>

          <div className="mt-8">
            {user ? (
              <SubscriptionButton hasActiveSubscription={hasActiveSubscription} />
            ) : (
              <Link
                href="/login?redirect=/pricing"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-zen-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-zen-blue-dark"
              >
                Sign in to subscribe
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}