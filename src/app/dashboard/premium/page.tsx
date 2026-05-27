import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPremiumPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/dashboard/premium');
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 mb-2">
        1:1 Sessions
      </h1>
      <p className="text-gray-600 mb-8">
        We are not offering online subscriptions right now. One-on-one sessions are
        the next offering and booking will be available soon.
      </p>

      <section className="rounded-xl border border-bgDark-2/20 bg-white p-6 sm:p-8">
        <p className="text-sm uppercase tracking-wide text-gray-500">Coming Soon</p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-900">Private Coaching</h2>
        <ul className="mt-6 space-y-3 text-gray-700">
          <li>Personalized 1:1 guidance and accountability</li>
          <li>Mind-body wellness strategy tailored to your goals</li>
          <li>Direct support while session scheduling is being finalized</li>
        </ul>
        <div className="mt-5">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-zen-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-zen-blue-dark"
          >
            Contact for Early Booking
          </Link>
        </div>
      </section>
    </div>
  );
}
