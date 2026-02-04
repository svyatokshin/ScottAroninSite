import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

/**
 * User dashboard. Redirects to onboarding if not completed.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login?redirect=/dashboard');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, onboarding_completed_at')
    .eq('id', user.id)
    .single();

  if (!profile?.onboarding_completed_at) {
    redirect('/onboarding');
  }

  const { data: enrollments } = await supabase
    .from('course_enrollments')
    .select(`
      enrolled_at,
      courses (id, title, slug, description)
    `)
    .eq('user_id', user.id)
    .order('enrolled_at', { ascending: false });

  const courses = (enrollments ?? [])
    .map((e) => {
      const c = Array.isArray(e.courses) ? e.courses[0] : e.courses;
      return c ? { ...c, enrolled_at: e.enrolled_at } : null;
    })
    .filter(Boolean) as Array<{
    id: string;
    title: string;
    slug: string;
    description: string | null;
    enrolled_at: string;
  }>;

  const displayName =
    profile?.full_name ?? user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'there';

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-serif font-semibold text-gray-900 mb-2">
          Welcome back, {displayName}
        </h1>
        <p className="text-gray-600 mb-10">Your courses and learning progress.</p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h2>
          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="block rounded-xl border border-bgDark-2/20 bg-white p-6 shadow-sm hover:shadow-lg hover:border-bgDark-2/30 transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  {course.description && (
                    <p className="mt-2 text-gray-600 line-clamp-2">{course.description}</p>
                  )}
                  <p className="mt-3 text-sm text-bgDark-2 font-medium">
                    Continue course →
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-bgDark-2/20 bg-white p-8 text-center">
              <p className="text-gray-600 mb-4">
                You&apos;re not enrolled in any courses yet. Browse our courses to get started.
              </p>
              <Link
                href="/courses"
                className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
