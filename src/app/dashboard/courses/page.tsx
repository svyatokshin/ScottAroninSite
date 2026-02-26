import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import EnrollButton from '@/components/courses/EnrollButton';

/**
 * Browse all published courses. Shows enrollment status and enroll/continue actions.
 */
export default async function DashboardCoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [coursesRes, enrollmentsRes] = await Promise.all([
    supabase
      .from('courses')
      .select('id, title, slug, description, self_enroll_enabled')
      .eq('published', true)
      .order('created_at', { ascending: false }),
    user
      ? supabase
          .from('course_enrollments')
          .select('course_id')
          .eq('user_id', user.id)
      : Promise.resolve({ data: [] }),
  ]);

  const courses = coursesRes.data ?? [];
  const enrolledIds = new Set(
    (enrollmentsRes.data ?? []).map((e) => e.course_id)
  );

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 mb-2">
        Browse Courses
      </h1>
      <p className="text-gray-600 mb-10">
        Explore available courses and enroll to access lesson content.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {courses.map((course) => {
          const isEnrolled = enrolledIds.has(course.id);

          return (
            <div
              key={course.id}
              className="rounded-xl border border-bgDark-2/20 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {course.title}
              </h2>
              {course.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {course.description}
                </p>
              )}
              <div className="mt-4">
                {isEnrolled ? (
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors min-h-[44px]"
                  >
                    Continue course →
                  </Link>
                ) : course.self_enroll_enabled ? (
                  <EnrollButton courseId={course.id} />
                ) : (
                  <Link
                    href="/contact"
                    className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors min-h-[44px]"
                  >
                    Contact to enroll
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {courses.length === 0 && (
        <div className="rounded-xl border border-bgDark-2/20 bg-white p-12 text-center text-gray-500">
          No courses available yet. Check back soon.
        </div>
      )}
    </div>
  );
}
