import type { Metadata } from 'next';
import { Cormorant_Garamond, Quicksand } from 'next/font/google';
import '@/assets/globals.css';
import Navbar from '@/components/layout/Navbar';

const quicksand = Quicksand({ 
  subsets: ['latin'], 
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700']
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${cormorant.variable} font-sans antialiased`}>
        {/* Animated background elements */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#87CEEB] via-[#5DADE2] to-[#3498DB]" />
        <div className="fixed inset-0 bg-zen-radial from-zen-blue-light/5 via-transparent to-transparent animate-zen-fade" />
        
        {/* Floating decorative elements */}
        <div className="fixed top-20 left-10 w-32 h-32 bg-zen-purple-light/10 rounded-full blur-2xl animate-float" />
        <div className="fixed bottom-20 right-10 w-40 h-40 bg-zen-blue-light/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zen-purple-light/5 rounded-full blur-3xl animate-ripple" />
        
        <div className="relative min-h-screen">
          <Navbar />
          <main className="pt-16 min-h-screen">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <footer className="relative bg-gradient-to-br from-[#5DADE2] via-[#3498DB] to-[#2980B9] py-10 backdrop-blur-md border-t border-zen-purple/30">
            {/* Premium space background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/10 via-transparent to-transparent opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.08),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
            {/* Star effects */}
            <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_10px_15px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_25px_40px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_35px_80px,#fff,rgba(0,0,0,0))] bg-[length:100px_100px] opacity-10" />
            
            {/* Subtle border lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zen-purple/30 to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {/* Company Info */}
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-playfair font-light text-white mb-3">Scott Aronin</h3>
                    <p className="text-white/90 font-light leading-relaxed text-sm">
                      Transformative mind-body wellness coaching for lasting change and inner peace.
                    </p>
                  </div>
                  
                  {/* Quick Links */}
                  <div className="text-center md:text-left">
                    <h4 className="text-base font-light text-white mb-3">Quick Links</h4>
                    <ul className="space-y-1.5">
                      <li><a href="/about" className="text-white/80 hover:text-white transition-colors font-light text-sm">About</a></li>
                      <li><a href="/services" className="text-white/80 hover:text-white transition-colors font-light text-sm">Services</a></li>
                      <li><a href="/research" className="text-white/80 hover:text-white transition-colors font-light text-sm">Research</a></li>
                      <li><a href="/contact" className="text-white/80 hover:text-white transition-colors font-light text-sm">Contact</a></li>
                    </ul>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="text-center md:text-left">
                    <h4 className="text-base font-light text-white mb-3">Get in Touch</h4>
                    <div className="space-y-1.5">
                      <p className="text-white/80 font-light text-sm">Book a free consultation</p>
                      <a 
                        href="/contact" 
                        className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors font-light text-sm group"
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
                <div className="pt-6 border-t border-zen-purple/20 text-center">
                  <p className="text-white/70 font-light text-sm">
                    © {new Date().getFullYear()} Scott Aronin. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 