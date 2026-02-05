import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

/**
 * User dashboard. Shows enrolled courses. Redirects to onboarding if not completed.
 */
export default async function DashboardPage() {
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

  const { data: enrollments } = await supabase
    .from('course_enrollments')
    .select(`
      enrolled_at,
      courses (
        id,
        title,
        slug,
        description
      )
    `)
    .eq('user_id', user.id)
    .order('enrolled_at', { ascending: false });

  const enrolledCourses = (enrollments ?? [])
    .map((e) => ({ ...e.courses, enrolled_at: e.enrolled_at }))
    .filter((c) => c?.id);

  const displayName = profile?.full_name?.trim() || 'there';

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 mb-2">
          Welcome back, {displayName}
        </h1>
        <p className="text-gray-600 mb-10">
          Continue your learning journey.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            My Courses
          </h2>
          {enrolledCourses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {enrolledCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group rounded-xl border border-bgDark-2/20 bg-white p-6 shadow-sm hover:shadow-lg hover:border-bgDark-2/30 transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-bgDark-2 transition-colors">
                    {course.title}
                  </h3>
                  {course.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {course.description}
                    </p>
                  )}
                  <span className="mt-4 inline-block text-sm text-bgDark-2 font-medium group-hover:underline">
                    Continue →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-bgDark-2/20 bg-white p-8 text-center">
              <p className="text-gray-600 mb-4">
                You&apos;re not enrolled in any courses yet.
              </p>
              <Link
                href="/courses"
                className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors"
              >
                Browse Courses
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                Contact us if you need to be enrolled in a course.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
