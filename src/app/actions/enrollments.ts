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
