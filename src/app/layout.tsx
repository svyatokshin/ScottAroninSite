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
        <div className="fixed inset-0 bg-white" />
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
          <footer className="relative bg-gradient-to-b from-transparent to-zen-blue-dark/5 py-8 mt-16">
            <div className="container mx-auto px-4 text-center text-zen-blue-dark/60">
              <p className="animate-fade-in">© {new Date().getFullYear()} Scott Aronin. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 