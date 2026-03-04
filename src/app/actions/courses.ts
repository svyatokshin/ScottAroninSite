'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSupabase } from '@/lib/auth/master';

async function requireAdmin() {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized', supabase: null as never };
  return { supabase: auth.supabase };
}

/** Course input */
export interface CourseInput {
  title: string;
  slug: string;
  description?: string | null;
  published?: boolean;
  self_enroll_enabled?: boolean;
  featured_image_path?: string | null;
  default_media_type?: 'video' | 'audio' | 'mixed' | null;
}

/** Module input */
export interface ModuleInput {
  title: string;
  sort_order?: number;
}

/** Lesson input */
export interface LessonInput {
  title: string;
  slug: string;
  content?: string | null;
  media_type?: 'audio' | 'video' | null;
  media_path?: string | null;
  duration_sec?: number | null;
  sort_order?: number;
}

export async function createCourse(input: CourseInput) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { data, error } = await r.supabase
    .from('courses')
    .insert({
      title: input.title,
      slug: input.slug,
      description: input.description ?? null,
      published: input.published ?? false,
      self_enroll_enabled: input.self_enroll_enabled ?? false,
      featured_image_path: input.featured_image_path ?? null,
      default_media_type: input.default_media_type ?? null,
    })
    .select('id')
    .single();

  if (error) return { error: error.message };
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  return { data: { id: data.id } };
}

export async function updateCourse(id: string, input: CourseInput) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { error } = await r.supabase
    .from('courses')
    .update({
      title: input.title,
      slug: input.slug,
      description: input.description ?? null,
      published: input.published ?? false,
      self_enroll_enabled: input.self_enroll_enabled ?? false,
      featured_image_path: input.featured_image_path ?? null,
      default_media_type: input.default_media_type ?? null,
    })
    .eq('id', id);

  if (error) return { error: error.message };
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  revalidatePath(`/courses/${input.slug}`);
  return {};
}

export async function deleteCourse(id: string) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { error } = await r.supabase.from('courses').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  return {};
}

export async function createModule(courseId: string, input: ModuleInput) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { data, error } = await r.supabase
    .from('modules')
    .insert({
      course_id: courseId,
      title: input.title,
      sort_order: input.sort_order ?? 0,
    })
    .select('id')
    .single();

  if (error) return { error: error.message };
  revalidatePath('/admin/modules');
  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath(`/courses/${courseId}`);
  return { data: { id: data.id } };
}

export async function updateModule(id: string, courseId: string, input: ModuleInput) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { error } = await r.supabase
    .from('modules')
    .update({
      title: input.title,
      sort_order: input.sort_order ?? 0,
    })
    .eq('id', id);

  if (error) return { error: error.message };
  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath(`/admin/courses/${courseId}/edit`);
  revalidatePath(`/admin/courses/${courseId}/lessons`);
  return {};
}

export async function deleteModule(id: string, courseId: string) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { error } = await r.supabase.from('modules').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/modules');
  revalidatePath(`/admin/courses/${courseId}`);
  return {};
}

export async function createLesson(moduleId: string, input: LessonInput) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { data, error } = await r.supabase
    .from('lessons')
    .insert({
      module_id: moduleId,
      title: input.title,
      slug: input.slug,
      content: input.content ?? null,
      media_type: input.media_type ?? null,
      media_path: input.media_path ?? null,
      duration_sec: input.duration_sec ?? null,
      sort_order: input.sort_order ?? 0,
    })
    .select('id')
    .single();

  if (error) return { error: error.message };
  return { data: { id: data.id } };
}

export async function updateLesson(id: string, input: LessonInput) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { error } = await r.supabase
    .from('lessons')
    .update({
      title: input.title,
      slug: input.slug,
      content: input.content ?? null,
      media_type: input.media_type ?? null,
      media_path: input.media_path ?? null,
      duration_sec: input.duration_sec ?? null,
      sort_order: input.sort_order ?? 0,
    })
    .eq('id', id);

  if (error) return { error: error.message };
  return {};
}

export async function deleteLesson(id: string) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { error } = await r.supabase.from('lessons').delete().eq('id', id);
  if (error) return { error: error.message };
  return {};
}
