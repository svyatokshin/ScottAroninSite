'use client';

import { usePathname } from 'next/navigation';

const blueTopRoutes = ['/pricing', '/courses'];

const isBlueTopRoute = (path: string) =>
  blueTopRoutes.some((route) => path === route || path.startsWith(`${route}/`));

export default function SiteFooter() {
  const pathname = usePathname() ?? '';
  const useBlueTop = isBlueTopRoute(pathname);

  const containerGradient = useBlueTop
    ? 'bg-gradient-to-b from-bgLight-3 via-bgLight-3 to-bgLight-3'
    : 'bg-gradient-to-b from-white via-bgNeutral-cream via-bgLight-1 to-bgLight-3';

  const topBlend = useBlueTop
    ? 'bg-gradient-to-b from-bgLight-3 via-bgLight-3/80 to-transparent'
    : 'bg-gradient-to-b from-white via-white/80 to-transparent';

  return (
    <footer className={`relative pt-20 pb-10 backdrop-blur-md -mt-16 overflow-hidden ${containerGradient}`}>
      <div className={`absolute top-0 left-0 right-0 h-32 z-0 pointer-events-none ${topBlend}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/10 via-transparent to-transparent opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_10px_15px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_25px_40px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_35px_80px,#fff,rgba(0,0,0,0))] bg-[length:100px_100px] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-playfair font-light text-gray-900 mb-3">Scott Aronin</h3>
              <p className="text-gray-800/90 font-light leading-relaxed text-sm">
                Transformative mind-body wellness coaching for lasting change and inner peace.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-base font-light text-gray-900 mb-3">Quick Links</h4>
              <ul className="space-y-1.5">
                <li><a href="/about" className="text-gray-800/80 hover:text-bgDark-2 transition-colors font-light text-sm">About</a></li>
                <li><a href="/services" className="text-gray-800/80 hover:text-bgDark-2 transition-colors font-light text-sm">Services</a></li>
                <li><a href="/research" className="text-gray-800/80 hover:text-bgDark-2 transition-colors font-light text-sm">Research</a></li>
                <li><a href="/contact" className="text-gray-800/80 hover:text-bgDark-2 transition-colors font-light text-sm">Contact</a></li>
                <li><a href="/admin" className="text-gray-800/80 hover:text-bgDark-2 transition-colors font-light text-sm">Admin</a></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-base font-light text-gray-900 mb-3">Get in Touch</h4>
              <div className="space-y-1.5">
                <p className="text-gray-800/80 font-light text-sm">Book a free consultation</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-gray-800 hover:text-bgDark-2 transition-colors font-light text-sm group"
                >
                  Contact Us
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-300/30 text-center">
            <p className="text-gray-700/70 font-light text-sm">
              © {new Date().getFullYear()} Scott Aronin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
