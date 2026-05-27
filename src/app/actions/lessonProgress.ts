'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/** Progress for one course (used by dashboard and course page). */
export interface CourseProgress {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  completedCount: number;
  totalCount: number;
  completedLessonIds: string[];
  nextLesson?: {
    id: string;
    slug: string;
    title: string;
    moduleId: string;
  };
}

/**
 * Records that the current user completed a lesson. Idempotent (upsert).
 * @param lessonId - UUID of the lesson
 * @param courseSlug - Optional course slug for path revalidation
 */
export async function recordLessonComplete(
  lessonId: string,
  courseSlug?: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase.from('lesson_progress').upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,lesson_id' }
  );

  if (error) return { error: error.message };
  revalidatePath('/dashboard');
  revalidatePath('/courses');
  if (courseSlug) revalidatePath(`/courses/${courseSlug}`);
  return {};
}

/**
 * Fetches lesson progress for the current user across all enrolled courses.
 * Used by the dashboard for progress bars and "Continue" links.
 */
export async function getLessonProgressForEnrolledCourses(): Promise<{
  progress: CourseProgress[];
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { progress: [], error: 'Unauthorized' };

  const { data: enrollments } = await supabase
    .from('course_enrollments')
    .select('course_id, courses(id, slug, title)')
    .eq('user_id', user.id);

  if (!enrollments?.length) return { progress: [] };

  const courseIds = enrollments
    .map((e) => {
      const c = e.courses as { id: string } | { id: string }[] | null;
      return Array.isArray(c) ? c[0]?.id : c?.id;
    })
    .filter(Boolean) as string[];

  return getLessonProgressForCourses(supabase, user.id, courseIds, enrollments);
}

/**
 * Fetches lesson progress for the current user for a single course.
 */
export async function getLessonProgressForCourse(
  courseId: string
): Promise<{ progress: CourseProgress | null; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { progress: null, error: 'Unauthorized' };

  const { data: course } = await supabase
    .from('courses')
    .select('id, slug, title')
    .eq('id', courseId)
    .single();

  if (!course) return { progress: null };

  const result = await getLessonProgressForCourses(supabase, user.id, [
    courseId,
  ], [{ course_id: courseId, courses: course }]);

  return {
    progress: result.progress[0] ?? null,
    error: result.error,
  };
}

/**
 * Shared helper to compute progress for given courses.
 */
async function getLessonProgressForCourses(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  courseIds: string[],
  enrollments: { course_id: string; courses: unknown }[]
): Promise<{ progress: CourseProgress[]; error?: string }> {
  const { data: modules } = await supabase
    .from('modules')
    .select(
      `
      id,
      course_id,
      sort_order,
      lessons (
        id,
        slug,
        title,
        sort_order
      )
    `
    )
    .in('course_id', courseIds)
    .order('sort_order', { ascending: true });

  const { data: progressRows } = await supabase
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', userId);

  const completedSet = new Set(
    (progressRows ?? []).map((p) => p.lesson_id)
  );

  const courseMap = new Map<
    string,
    { id: string; slug: string; title: string }
  >();
  for (const e of enrollments) {
    const c = e.courses as { id: string; slug: string; title: string } | null;
    if (c) courseMap.set(e.course_id, c);
  }

  const lessonsByCourse = new Map<
    string,
    { id: string; slug: string; title: string; sortOrder: number; moduleId: string }[]
  >();

  for (const mod of modules ?? []) {
    const courseId = mod.course_id as string;
    if (!lessonsByCourse.has(courseId)) {
      lessonsByCourse.set(courseId, []);
    }
    const list = lessonsByCourse.get(courseId)!;
    const lessons = (mod.lessons ?? []) as {
      id: string;
      slug: string;
      title: string;
      sort_order: number;
    }[];
    for (const l of lessons.sort((a, b) => a.sort_order - b.sort_order)) {
      list.push({
        id: l.id,
        slug: l.slug,
        title: l.title,
        sortOrder: l.sort_order,
        moduleId: mod.id,
      });
    }
  }

  const progress: CourseProgress[] = [];

  for (const courseId of courseIds) {
    const meta = courseMap.get(courseId);
    if (!meta) continue;

    const lessons = lessonsByCourse.get(courseId) ?? [];
    const completedLessonIds = lessons
      .filter((l) => completedSet.has(l.id))
      .map((l) => l.id);
    const totalCount = lessons.length;
    const completedCount = completedLessonIds.length;

    const nextLesson = lessons.find((l) => !completedSet.has(l.id));

    progress.push({
      courseId,
      courseSlug: meta.slug,
      courseTitle: meta.title,
      completedCount,
      totalCount,
      completedLessonIds,
      nextLesson: nextLesson
        ? {
            id: nextLesson.id,
            slug: nextLesson.slug,
            title: nextLesson.title,
            moduleId: nextLesson.moduleId,
          }
        : undefined,
    });
  }

  return { progress };
}
