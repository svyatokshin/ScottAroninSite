'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPost, updateBlogPost } from '@/app/actions/blog';

interface BlogPostFormProps {
  postId?: string;
  initialData?: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image_path: string;
    published: boolean;
    published_at: string;
  };
}

/**
 * Generates slug from title.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Blog post create/edit form with featured image upload.
 */
export default function BlogPostForm({ postId, initialData }: BlogPostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [featuredImagePath, setFeaturedImagePath] = useState(initialData?.featured_image_path ?? '');
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setTitle(v);
    if (!initialData?.slug || slug === slugify(initialData.title)) {
      setSlug(slugify(v));
    }
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/blog-images', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      setFeaturedImagePath(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const payload = {
        title,
        slug: slug || slugify(title),
        excerpt: excerpt || undefined,
        content: content || undefined,
        featured_image_path: featuredImagePath || null,
        published,
        published_at: published ? new Date().toISOString() : null,
      };
      if (postId) {
        const result = await updateBlogPost(postId, payload);
        if (result.error) throw new Error(result.error);
        router.push('/admin/blog');
        router.refresh();
      } else {
        const result = await createBlogPost(payload);
        if (result.error) throw new Error(result.error);
        if (result.data?.id) {
          router.push(`/admin/blog/${result.data.id}/edit`);
          router.refresh();
        } else {
          router.push('/admin/blog');
          router.refresh();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 bg-white text-gray-900 placeholder-gray-500/60 min-h-[44px]';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
          className={inputClass}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className={inputClass}
          placeholder="url-friendly-slug"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className={`${inputClass} min-h-[80px] resize-y`}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className={`${inputClass} min-h-[200px] resize-y`}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Featured Image
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFeaturedImageUpload}
          disabled={isUploading || isSubmitting}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-bgDark-2/20 file:text-gray-700 hover:file:bg-bgDark-2/30"
        />
        {isUploading && <p className="mt-1 text-sm text-gray-500">Uploading...</p>}
        {featuredImagePath && (
          <p className="mt-1 text-sm text-gray-600">Image: {featuredImagePath}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          disabled={isSubmitting}
          className="h-4 w-4 rounded border-gray-300 text-bgDark-1 focus:ring-bgDark-2/60"
        />
        <label htmlFor="published" className="text-sm font-medium text-gray-700">
          Published
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors disabled:opacity-50 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-bgDark-2/60"
        >
          {isSubmitting ? 'Saving...' : postId ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors min-h-[44px]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
