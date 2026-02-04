'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Marks the current user's onboarding as complete.
 */
export async function completeOnboarding() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('profiles')
    .update({ onboarding_completed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (error) return { error: error.message };
  revalidatePath('/dashboard');
  revalidatePath('/onboarding');
  return {};
}
