'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized', supabase: null as never };
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') return { error: 'Forbidden', supabase: null as never };
  return { supabase };
}

/**
 * Adds a user to a course (manual enrollment). Admin only.
 */
export async function addEnrollment(userId: string, courseId: string) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { error } = await r.supabase.from('course_enrollments').insert({
    user_id: userId,
    course_id: courseId,
  });

  if (error) return { error: error.message };
  revalidatePath('/admin/courses');
  revalidatePath('/admin/enrollments');
  return {};
}

/**
 * Self-enrolls the current user in a course. Only works when course has self_enroll_enabled.
 */
export async function enrollSelf(courseId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data: course } = await supabase
    .from('courses')
    .select('id, self_enroll_enabled, published')
    .eq('id', courseId)
    .single();

  if (!course?.published || !course?.self_enroll_enabled) {
    return { error: 'This course is not available for self-enrollment' };
  }

  const { error } = await supabase.from('course_enrollments').insert({
    user_id: user.id,
    course_id: courseId,
  });

  if (error) {
    if (error.code === '23505') return { error: 'Already enrolled' };
    return { error: error.message };
  }
  revalidatePath('/courses');
  revalidatePath('/dashboard');
  return {};
}

/**
 * Removes a user from a course. Admin only.
 */
export async function removeEnrollment(userId: string, courseId: string) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { error } = await r.supabase
    .from('course_enrollments')
    .delete()
    .eq('user_id', userId)
    .eq('course_id', courseId);

  if (error) return { error: error.message };
  revalidatePath('/admin/courses');
  revalidatePath('/admin/enrollments');
  return {};
}
