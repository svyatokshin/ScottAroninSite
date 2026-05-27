import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bgLight-4 via-bgLight-4 to-bgLight-3 py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-3 text-center font-playfair text-4xl font-light text-gray-900 sm:text-5xl">
          1:1 Coaching Sessions
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-center text-gray-700">
          We&apos;re not accepting subscription purchases right now. Private 1:1 sessions
          are the focus for our next launch phase.
        </p>

        <div className="rounded-2xl border border-bgDark-2/20 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-sm uppercase tracking-wide text-gray-500">Launching Soon</p>
          <h2 className="mt-2 text-3xl font-semibold text-gray-900">
            Personalized Wellness Coaching
          </h2>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li>Dedicated 1:1 sessions tailored to your goals</li>
            <li>Mind-body, fitness, and nutrition strategy support</li>
            <li>Direct communication while booking automation is in progress</li>
            <li>Priority access for early inquiries</li>
          </ul>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-zen-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-zen-blue-dark"
            >
              Contact for 1:1 Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}