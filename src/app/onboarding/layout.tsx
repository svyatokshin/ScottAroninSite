import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Onboarding layout: requires auth. Redirects to login if not signed in.
 */
export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/onboarding');
  }

  return <>{children}</>;
}
