import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LessonForm from '@/components/admin/LessonForm';
import QuizManager from '@/components/admin/QuizManager';

/**
 * Edit lesson page. Includes lesson form and mini-quiz manager.
 */
export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string; lessonId: string }>;
}) {
  const { courseId, moduleId, lessonId } = await params;
  const supabase = await createClient();

  const [{ data: lesson }, { data: module }, { data: quizQuestions }] =
    await Promise.all([
      supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .eq('module_id', moduleId)
        .single(),
      supabase.from('modules').select('title').eq('id', moduleId).single(),
      supabase
        .from('quiz_questions')
        .select('id, question_text, question_type, options, sort_order')
        .eq('lesson_id', lessonId)
        .order('sort_order'),
    ]);

  if (!lesson) notFound();

  return (
    <div>
      <Link
        href={`/admin/courses/${courseId}/lessons`}
        className="text-sm text-bgDark-2 hover:underline mb-4 inline-block"
      >
        ← Back to Lessons
      </Link>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
        Edit Lesson — {module?.title ?? 'Module'}
      </h1>
      <LessonForm
        courseId={courseId}
        moduleId={moduleId}
        moduleTitle={module?.title ?? ''}
        lessonId={lesson.id}
        initialData={{
          title: lesson.title,
          slug: lesson.slug,
          content: lesson.content ?? '',
          media_type: lesson.media_type ?? null,
          media_path: lesson.media_path ?? '',
          duration_sec: lesson.duration_sec ?? undefined,
          sort_order: lesson.sort_order,
        }}
      />
      <QuizManager
        lessonId={lessonId}
        questions={quizQuestions ?? []}
        courseId={courseId}
      />
    </div>
  );
}
