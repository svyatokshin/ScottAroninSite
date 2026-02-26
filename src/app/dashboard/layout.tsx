import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import UserSidebar from '@/components/user/UserSidebar';

/**
 * Dashboard layout: requires auth and onboarding. Renders sidebar + children.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/dashboard');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed_at, full_name')
    .eq('id', user.id)
    .single();

  if (!profile?.onboarding_completed_at) {
    redirect('/onboarding');
  }

  const displayName = profile?.full_name?.trim() || 'User';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <UserSidebar displayName={displayName} />
      <main className="flex-1 overflow-auto pt-14 md:pt-0 min-w-0">
        <div className="container mx-auto px-4 py-6 md:py-8">{children}</div>
      </main>
    </div>
  );
}
