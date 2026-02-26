import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Lato } from 'next/font/google';
import '@/assets/globals.css';
import LayoutChrome from '@/components/layout/LayoutChrome';

const lato = Lato({ 
  subsets: ['latin'], 
  weight: ['300', '400', '700', '900'],
  display: 'swap',
  variable: '--font-lato',
});
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Scott Aronin - Mind-Body Wellness',
  description: 'Discover inner peace and balance through our transformative mind-body wellness programs.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lato.variable} ${cormorant.variable}`}>
      <body className={`${lato.className} antialiased`}>
        {/* Animated background elements */}
        <div className="fixed inset-0 bg-gradient-to-br from-bgLight-4 via-bgLight-3 to-bgLight-2" />
        <div className="fixed inset-0 bg-zen-radial from-zen-blue-light/5 via-transparent to-transparent animate-zen-fade" />
        
        {/* Floating decorative elements */}
        <div className="fixed top-20 left-10 w-32 h-32 bg-zen-purple-light/10 rounded-full blur-2xl animate-float" />
        <div className="fixed bottom-20 right-10 w-40 h-40 bg-zen-blue-light/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zen-purple-light/5 rounded-full blur-3xl animate-ripple" />
        
        <div className="relative min-h-screen">
          <LayoutChrome
            footer={
              <footer className="relative bg-gradient-to-b from-white via-bgNeutral-cream via-bgLight-1 to-bgLight-3 pt-20 pb-10 backdrop-blur-md -mt-16 overflow-hidden">
                {/* Top blend - strong white at top so footer merges with section above */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-0 pointer-events-none" />
                {/* Premium space background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/10 via-transparent to-transparent opacity-40" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.08),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
                {/* Star effects */}
                <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_10px_15px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_25px_40px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_35px_80px,#fff,rgba(0,0,0,0))] bg-[length:100px_100px] opacity-10" />
                <div className="container mx-auto px-4 relative z-10">
                  <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                      {/* Company Info */}
                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-playfair font-light text-gray-900 mb-3">Scott Aronin</h3>
                        <p className="text-gray-800/90 font-light leading-relaxed text-sm">
                          Transformative mind-body wellness coaching for lasting change and inner peace.
                        </p>
                      </div>
                      {/* Quick Links */}
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
                      {/* Contact Info */}
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
                    {/* Bottom Bar */}
                    <div className="pt-6 border-t border-gray-300/30 text-center">
                      <p className="text-gray-700/70 font-light text-sm">
                        © {new Date().getFullYear()} Scott Aronin. All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            }
          >
            {children}
          </LayoutChrome>
        </div>
      </body>
    </html>
  );
} 