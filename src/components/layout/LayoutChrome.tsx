'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

/** Whether the current route is an admin area (navbar/footer hidden). */
const isAdminRoute = (path: string) => path.startsWith('/admin');

/** Whether the current route is the user dashboard panel (navbar/footer hidden). */
const isDashboardRoute = (path: string) => path.startsWith('/dashboard');

/** Whether the current route is the login/signup page (navbar/footer hidden). */
const isLoginRoute = (path: string) => path === '/login';

/**
 * Conditionally renders Navbar and applies main padding.
 * Hides main site chrome on admin, dashboard, and login routes.
 */
export default function LayoutChrome({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const path = pathname ?? '';
  const showSiteChrome =
    !isAdminRoute(path) && !isDashboardRoute(path) && !isLoginRoute(path);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0D47A1] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:w-auto focus:h-auto focus:m-0 focus:overflow-visible focus:[clip:auto]"
      >
        Skip to main content
      </a>
      {showSiteChrome && <Navbar />}
      <main
        id="main-content"
        className={`min-h-screen ${showSiteChrome ? 'pt-16' : 'pt-0'}`}
      >
        <div className="animate-fade-in">{children}</div>
      </main>
      {showSiteChrome && footer}
    </>
  );
}
