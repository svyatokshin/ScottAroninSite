import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getSubscriptionStateForUser } from '@/lib/subscription';
import SubscriptionButton from '@/components/subscription/SubscriptionButton';

export default async function DashboardPremiumPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/dashboard/premium');
  }

  const subscriptionState = await getSubscriptionStateForUser(user.id, supabase);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 mb-2">
        Premium Membership
      </h1>
      <p className="text-gray-600 mb-8">
        Upgrade to unlock all premium course material while keeping free dashboard
        videos on every account.
      </p>

      <section className="rounded-xl border border-bgDark-2/20 bg-white p-6 sm:p-8">
        <p className="text-sm uppercase tracking-wide text-gray-500">Premium</p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-900">$99/month</h2>
        <ul className="mt-6 space-y-3 text-gray-700">
          <li>Unlimited access to premium lessons and full media library</li>
          <li>Lesson quizzes and progress tracking across all courses</li>
          <li>Self-service billing and cancellation in Stripe portal</li>
        </ul>
        <p className="mt-6 text-sm text-gray-600">
          Current status:{' '}
          <span className="font-medium text-gray-900 capitalize">
            {subscriptionState.hasActiveSubscription
              ? 'active'
              : subscriptionState.subscription?.status ?? 'inactive'}
          </span>
        </p>
        <div className="mt-5">
          <SubscriptionButton
            hasActiveSubscription={subscriptionState.hasActiveSubscription}
          />
        </div>
      </section>
    </div>
  );
}
