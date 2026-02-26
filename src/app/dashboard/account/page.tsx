import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AccountSettings from '@/components/user/AccountSettings';

/**
 * User account page. Shows profile info and password change form.
 */
export default async function DashboardAccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/dashboard/account');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single();

  const displayName = profile?.full_name?.trim() || 'User';
  const email = user.email ?? '';

  return (
    <div className="max-w-lg">
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 mb-2">
        Account
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your account settings.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Profile</h2>
        <div className="rounded-xl border border-bgDark-2/20 bg-white p-6 space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</p>
            <p className="text-gray-900">{displayName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
            <p className="text-gray-900">{email}</p>
          </div>
        </div>
      </section>

      <AccountSettings />
    </div>
  );
}
