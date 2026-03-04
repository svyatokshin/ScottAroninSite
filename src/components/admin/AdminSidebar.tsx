'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/modules', label: 'Modules' },
  { href: '/admin/courses', label: 'Courses' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/enrollments', label: 'Enrollments' },
  { href: '/admin/account', label: 'Account' },
];

/** Hamburger icon (three lines). */
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

/** Close (X) icon. */
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

/**
 * Admin sidebar with navigation and logout.
 * On mobile: fixed header with hamburger; sidebar slides in as drawer with overlay.
 * On md+: static sidebar as usual.
 */
export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    await fetch('/api/auth/master-logout', { method: 'POST', credentials: 'include' });
    router.push('/admin/login');
    router.refresh();
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const sidebarContent = (
    <>
      <div className="p-6 border-b border-gray-200 flex items-center justify-between md:block">
        <div>
          <Link
            href="/admin"
            onClick={closeMobileMenu}
            className="text-xl font-serif font-semibold text-gray-900 hover:text-bgDark-2 transition-colors"
          >
            Admin
          </Link>
          <p className="text-sm text-gray-500 mt-1">Scott Aronin</p>
        </div>
        <button
          type="button"
          onClick={closeMobileMenu}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close menu"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-[#1C6ED5] hover:bg-[#1C6ED5]/10 transition-colors min-h-[44px] border border-[#1C6ED5]/30"
          aria-label="View site as user"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View as User
        </Link>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                isActive
                  ? 'bg-[#0D47A1] text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors min-h-[44px] text-left focus:outline-none focus:ring-2 focus:ring-bgDark-2/60"
        >
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header: visible only below md */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-20 flex items-center px-4 gap-3 md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <Link
          href="/admin"
          className="text-lg font-serif font-semibold text-gray-900 truncate"
        >
          Admin
        </Link>
      </header>

      {/* Overlay: only when mobile menu open */}
      {isMobileMenuOpen && (
        <button
          type="button"
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          aria-label="Close menu"
        />
      )}

      {/* Sidebar: drawer on mobile, static on md+ */}
      <aside
        className={`
          w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-screen
          fixed md:relative inset-y-0 left-0 z-40 md:z-auto
          transform transition-transform duration-200 ease-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        aria-label="Admin navigation"
      >
        {sidebarContent}
      </aside>
    </>
  );
}
