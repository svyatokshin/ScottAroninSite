'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

/** Whether the current route is an admin area (navbar/footer hidden). */
const isAdminRoute = (path: string) => path.startsWith('/admin');

/**
 * Conditionally renders Navbar and applies main padding.
 * Hides main site chrome on admin routes so the dashboard isn't obscured.
 */
export default function LayoutChrome({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSiteChrome = !isAdminRoute(pathname ?? '');

  return (
    <>
      {showSiteChrome && <Navbar />}
      <main
        className={`min-h-screen ${showSiteChrome ? 'pt-16' : 'pt-0'}`}
      >
        <div className="animate-fade-in">{children}</div>
      </main>
      {showSiteChrome && footer}
    </>
  );
}
