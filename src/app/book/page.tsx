import { createClient } from '@/lib/supabase/server';
import CalendlyEmbed from '@/components/booking/CalendlyEmbed';

export const metadata = {
  title: 'Book a Session | Scott Aronin',
  description:
    'Schedule a wellness session with Scott Aronin. Free consultation available.',
};

export default async function BookPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from('scheduling_settings')
    .select('calendly_url')
    .limit(1)
    .single();

  const calendlyUrl = settings?.calendly_url;

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-gradient-to-br from-bgLight-4 via-bgLight-4 to-bgLight-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/15 via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.10),transparent_70%)]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-gray-900/90 text-sm font-medium tracking-widest uppercase mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-bgDark-2/50 to-transparent" />
              <span>Schedule</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-bgDark-2/50" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-light text-gray-900 leading-tight tracking-tight mb-4">
              Book a Session
            </h1>
            <p className="text-lg text-gray-700 font-light max-w-2xl mx-auto">
              Choose a time that works for you. Free consultations are available
              for new clients.
            </p>
          </div>

          {calendlyUrl ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <CalendlyEmbed url={calendlyUrl} className="w-full" />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bgLight-3 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Online Booking Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                In the meantime, please reach out to schedule your session.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-bgDark-2/20 border border-bgDark-2/50 px-8 py-3 rounded-full font-semibold text-gray-900 shadow-xl hover:bg-bgDark-2/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60"
                style={{
                  boxShadow: '0 4px 32px 0 rgba(0,70,201,0.25)',
                }}
              >
                Contact Us
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
