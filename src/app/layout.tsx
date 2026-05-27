import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Lato } from 'next/font/google';
import '@/assets/globals.css';
import LayoutChrome from '@/components/layout/LayoutChrome';
import SiteFooter from '@/components/layout/SiteFooter';

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
          <LayoutChrome footer={<SiteFooter />}>
            {children}
          </LayoutChrome>
        </div>
      </body>
    </html>
  );
} 