import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

/**
 * Onboarding page for new users. Redirects to dashboard if already completed.
 */
export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login?redirect=/onboarding');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed_at, full_name')
    .eq('id', user.id)
    .single();

  if (profile?.onboarding_completed_at) {
    redirect('/dashboard');
  }

  const { data: enrollments } = await supabase
    .from('course_enrollments')
    .select('course_id, courses(title, slug)')
    .eq('user_id', user.id);

  const enrolledCourses = (enrollments ?? []).map((e) => {
    const c = Array.isArray(e.courses) ? e.courses[0] : e.courses;
    return c ? { title: c.title, slug: c.slug } : null;
  }).filter(Boolean) as { title: string; slug: string }[];

  return (
    <div className="min-h-screen py-16 sm:py-24 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <OnboardingFlow
          userName={profile?.full_name ?? user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'there'}
          enrolledCourses={enrolledCourses}
        />
      </div>
    </div>
  );
}
