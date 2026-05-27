'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSupabase } from '@/lib/auth/master';

async function requireAdmin() {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized', supabase: null as never };
  return { supabase: auth.supabase };
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
