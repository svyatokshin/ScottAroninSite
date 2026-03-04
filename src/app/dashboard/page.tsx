import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getLessonProgressForEnrolledCourses } from '@/app/actions/lessonProgress';

/**
 * User dashboard home. Shows enrolled courses with progress and browse CTA.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/dashboard');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single();

  const [enrollmentsRes, { progress }] = await Promise.all([
    supabase
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
      .order('enrolled_at', { ascending: false }),
    getLessonProgressForEnrolledCourses(),
  ]);

  const enrollments = enrollmentsRes.data ?? [];
  const enrolledCourses = enrollments
    .map((e) => {
      const raw = e.courses as { id: string; title: string; slug: string; description?: string } | { id: string; title: string; slug: string; description?: string }[] | null;
      const c = Array.isArray(raw) ? raw[0] : raw;
      if (!c?.id) return null;
      return { ...c, enrolled_at: e.enrolled_at };
    })
    .filter(Boolean) as { id: string; title: string; slug: string; description?: string; enrolled_at: string }[];

  const progressByCourse = new Map(progress.map((p) => [p.courseId, p]));
  const totalCompleted = progress.reduce((sum, p) => sum + p.completedCount, 0);
  const totalLessons = progress.reduce((sum, p) => sum + p.totalCount, 0);

  const displayName = profile?.full_name?.trim() || 'there';

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 mb-2">
        Welcome back, {displayName}
      </h1>
      <p className="text-gray-600 mb-6">
        Continue your learning journey.
      </p>

      {totalLessons > 0 && (
        <div className="mb-10 rounded-xl border border-bgDark-2/20 bg-white p-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{totalCompleted}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalLessons}</span> lessons
            completed across all courses
          </p>
        </div>
      )}

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          My Courses
        </h2>
        {enrolledCourses.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {enrolledCourses.map((course) => {
              const prog = progressByCourse.get(course.id);
              const completedCount = prog?.completedCount ?? 0;
              const totalCount = prog?.totalCount ?? 0;
              const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
              const continueHref = prog?.nextLesson
                ? `/courses/${course.slug}#lesson-${prog.nextLesson.id}`
                : `/courses/${course.slug}`;

              return (
                <Link
                  key={course.id}
                  href={continueHref}
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
                  {totalCount > 0 && (
                    <div className="mt-3" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${completedCount} of ${totalCount} lessons completed`}>
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-zen-blue transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {completedCount} of {totalCount} lessons
                      </p>
                    </div>
                  )}
                  <span className="mt-4 inline-block text-sm text-bgDark-2 font-medium group-hover:underline">
                    {prog?.nextLesson ? 'Continue →' : totalCount > 0 ? 'Review course →' : 'View course →'}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-bgDark-2/20 bg-white p-8 text-center">
            <p className="text-gray-600 mb-4">
              You&apos;re not enrolled in any courses yet.
            </p>
            <Link
              href="/dashboard/courses"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors"
            >
              Browse Courses
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Contact us if you need to be enrolled in a course.
            </p>
          </div>
        )}

        {enrolledCourses.length > 0 && (
          <div className="mt-10">
            <Link
              href="/dashboard/courses"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#1C6ED5] border border-[#1C6ED5]/30 hover:bg-[#1C6ED5]/10 transition-colors"
            >
              Browse more courses →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
