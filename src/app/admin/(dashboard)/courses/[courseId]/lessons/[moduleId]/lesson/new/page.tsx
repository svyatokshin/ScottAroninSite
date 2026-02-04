import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LessonForm from '@/components/admin/LessonForm';

/**
 * New lesson page. Presets default media type from course when available.
 */
export default async function NewLessonPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>;
}) {
  const { courseId, moduleId } = await params;
  const supabase = await createClient();

  const [{ data: module }, { data: course }] = await Promise.all([
    supabase
      .from('modules')
      .select('id, title, course_id')
      .eq('id', moduleId)
      .eq('course_id', courseId)
      .single(),
    supabase
      .from('courses')
      .select('default_media_type')
      .eq('id', courseId)
      .single(),
  ]);

  if (!module) notFound();

  const { data: modules } = await supabase
    .from('modules')
    .select('id')
    .eq('course_id', courseId)
    .order('sort_order');
  const lessonCount = modules?.length ?? 0;

  return (
    <div>
      <Link
        href={`/admin/courses/${courseId}/lessons`}
        className="text-sm text-bgDark-2 hover:underline mb-4 inline-block"
      >
        ← Back to Lessons
      </Link>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
        New Lesson — {module.title}
      </h1>
      <LessonForm
        courseId={courseId}
        moduleId={moduleId}
        moduleTitle={module.title}
        sortOrder={lessonCount}
        defaultMediaType={course?.default_media_type ?? undefined}
      />
    </div>
  );
}
