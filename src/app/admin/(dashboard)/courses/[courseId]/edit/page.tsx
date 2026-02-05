import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CourseForm from '@/components/admin/CourseForm';
import ModulesManager from '@/components/admin/ModulesManager';

/**
 * Edit course page. Includes course form and module management.
 */
export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();

  if (!course) notFound();

  const { data: modules } = await supabase
    .from('modules')
    .select('id, title, sort_order, lessons(id)')
    .eq('course_id', courseId)
    .order('sort_order', { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-semibold text-gray-900">
          Edit Course
        </h1>
        <Link
          href={`/admin/courses/${courseId}/lessons`}
          className="text-sm text-bgDark-2 hover:underline"
        >
          Manage Lessons →
        </Link>
      </div>
      <CourseForm
        courseId={course.id}
        initialData={{
          title: course.title,
          slug: course.slug,
          description: course.description ?? '',
          published: course.published,
          self_enroll_enabled: course.self_enroll_enabled ?? false,
          featured_image_path: course.featured_image_path ?? undefined,
          default_media_type: course.default_media_type ?? undefined,
        }}
      />
      <ModulesManager courseId={courseId} modules={modules ?? []} />
    </div>
  );
}
