'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSupabase } from '@/lib/auth/master';

/** Single source link entry */
export interface BlogSourceLink {
  url: string;
  label?: string;
}

/** Blog post for create/update */
export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image_path?: string | null;
  published?: boolean;
  published_at?: string | null;
  source_links?: BlogSourceLink[];
}

/**
 * Creates a new blog post. Admin only (Supabase or master).
 */
export async function createBlogPost(input: BlogPostInput) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const sourceLinks = (input.source_links ?? []).filter((s) => s?.url?.trim());
  const { data, error } = await auth.supabase
    .from('blog_posts')
    .insert({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt ?? null,
      content: input.content ?? null,
      featured_image_path: input.featured_image_path ?? null,
      published: input.published ?? false,
      published_at: input.published ? new Date().toISOString() : null,
      source_links: sourceLinks,
      updated_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (error) return { error: error.message };
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return { data: { id: data.id } };
}

/**
 * Updates a blog post. Admin only (Supabase or master).
 */
export async function updateBlogPost(id: string, input: BlogPostInput) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const sourceLinks = (input.source_links ?? []).filter((s) => s?.url?.trim());
  const updatePayload: Record<string, unknown> = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt ?? null,
    content: input.content ?? null,
    featured_image_path: input.featured_image_path ?? null,
    published: input.published ?? false,
    source_links: sourceLinks,
    updated_at: new Date().toISOString(),
  };
  if (input.published && !input.published_at) {
    updatePayload.published_at = new Date().toISOString();
  } else if (!input.published) {
    updatePayload.published_at = null;
  }

  const { error } = await auth.supabase
    .from('blog_posts')
    .update(updatePayload)
    .eq('id', id);

  if (error) return { error: error.message };
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  revalidatePath(`/blog/${input.slug}`);
  return {};
}

/**
 * Deletes a blog post. Admin only (Supabase or master).
 */
export async function deleteBlogPost(id: string) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { error } = await auth.supabase.from('blog_posts').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return {};
}
