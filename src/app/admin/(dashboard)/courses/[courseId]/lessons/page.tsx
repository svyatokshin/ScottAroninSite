import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LessonsManager from '@/components/admin/LessonsManager';

/**
 * Course lessons management page. Lists modules and lessons.
 */
export default async function CourseLessonsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from('courses')
    .select('id, title, slug')
    .eq('id', courseId)
    .single();

  if (!course) notFound();

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
        media_type,
        sort_order
      )
    `)
    .eq('course_id', courseId)
    .order('sort_order', { ascending: true });

  const modulesWithLessons = (modules ?? []).map((m) => ({
    ...m,
    lessons: (m.lessons ?? []).sort(
      (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
    ),
  }));

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/courses"
          className="text-sm text-bgDark-2 hover:underline mb-4 inline-block"
        >
          ← Back to Courses
        </Link>
        <h1 className="text-2xl font-serif font-semibold text-gray-900">
          {course.title} — Lessons
        </h1>
      </div>

      <LessonsManager
        courseId={courseId}
        courseTitle={course.title}
        modules={modulesWithLessons}
      />
    </div>
  );
}
