import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  validateMasterCookie,
  COOKIE_NAME,
} from '@/lib/auth/master-cookie';

/**
 * Dashboard layout: verifies admin role and renders sidebar + children.
 * Master cookie bypass: valid master_session grants access without Supabase.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const masterCookie = cookieStore.get(COOKIE_NAME)?.value;
  const isMasterValid =
    masterCookie && (await validateMasterCookie(masterCookie));

  if (!isMasterValid) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/admin/login');
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      redirect('/admin/login');
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto pt-14 md:pt-0 min-w-0">
        <div className="container mx-auto px-4 py-6 md:py-8">{children}</div>
      </main>
    </div>
  );
}
