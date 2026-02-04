import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CourseContent from '@/components/courses/CourseContent';

/**
 * Public course detail. Shows modules/lessons.
 * Lesson media (audio/video) only visible to enrolled users.
 */
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from('courses')
    .select('id, title, slug, description')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!course) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  let isEnrolled = false;
  if (user) {
    const { data: enr } = await supabase
      .from('course_enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .single();
    isEnrolled = !!enr;
  }

  const { data: modules } = await supabase
    .from('modules')
    .select(`
      id,
      title,
      sort_order,
      lessons (
        id,
        title,
        slug,
        content,
        media_type,
        media_path,
        duration_sec,
        sort_order
      )
    `)
    .eq('course_id', course.id)
    .order('sort_order', { ascending: true });

  const modulesWithLessons = (modules ?? []).map((m) => ({
    ...m,
    lessons: (m.lessons ?? []).sort(
      (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
    ),
  }));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/courses"
          className="inline-flex items-center text-bgDark-2 hover:underline text-sm mb-8"
        >
          ← Back to Courses
        </Link>

        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 mb-4">
          {course.title}
        </h1>
        {course.description && (
          <p className="text-lg text-gray-600 mb-10">{course.description}</p>
        )}

        {!isEnrolled && (
          <div className="rounded-xl border border-bgDark-2/20 bg-white p-6 mb-10">
            <p className="text-gray-700">
              Sign in and enroll to access lesson content, including audio and video.
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}

        <CourseContent
          modules={modulesWithLessons}
          isEnrolled={isEnrolled}
          supabaseUrl={supabaseUrl}
        />
      </div>
    </div>
  );
}
