'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getAdminSupabase } from '@/lib/auth/master';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface NewsletterSubscribeResult {
  success?: true;
  message?: string;
  error?: string;
}

/**
 * Saves a public newsletter signup to the `newsletter_subscribers` table.
 * Uses the service-role Supabase client because the form is unauthenticated.
 */
export async function subscribeToNewsletter(
  formData: FormData
): Promise<NewsletterSubscribeResult> {
  const rawEmail = formData.get('email');
  if (typeof rawEmail !== 'string') {
    return { error: 'Please enter a valid email address.' };
  }

  const email = rawEmail.trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  const rawSource = formData.get('source');
  const source = typeof rawSource === 'string' && rawSource.trim()
    ? rawSource.trim().slice(0, 64)
    : 'home_page';

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email, source });

    if (error) {
      // 23505 = unique_violation (already subscribed)
      if (error.code === '23505') {
        return {
          success: true,
          message: "You're already on the list. Thanks for being part of the community!",
        };
      }
      console.error('Newsletter subscribe failed:', error);
      return { error: 'Could not save your subscription. Please try again.' };
    }

    return {
      success: true,
      message: "You're in! Thanks for joining the community.",
    };
  } catch (subscribeError) {
    console.error('Newsletter subscribe threw:', subscribeError);
    return { error: 'Could not save your subscription. Please try again.' };
  }
}

/**
 * Deletes a newsletter subscriber by id. Admin only (Supabase or master).
 */
export async function deleteNewsletterSubscriber(
  id: string
): Promise<{ success?: true; error?: string }> {
  if (!id) return { error: 'Missing subscriber id.' };

  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { error } = await auth.supabase
    .from('newsletter_subscribers')
    .delete()
    .eq('id', id);

  if (error) return { error: error.message };
  revalidatePath('/admin/newsletter');
  return { success: true };
}
