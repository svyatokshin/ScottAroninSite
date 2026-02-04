'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

/**
 * Admin sidebar with navigation and logout.
 */
export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/modules', label: 'Modules' },
    { href: '/admin/courses', label: 'Courses' },
    { href: '/admin/blog', label: 'Blog' },
    { href: '/admin/enrollments', label: 'Enrollments' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <Link
          href="/admin"
          className="text-xl font-serif font-semibold text-gray-900 hover:text-bgDark-2 transition-colors"
        >
          Admin
        </Link>
        <p className="text-sm text-gray-500 mt-1">Scott Aronin</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  );
}
