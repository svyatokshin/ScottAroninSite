'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCourse, updateCourse } from '@/app/actions/courses';

interface CourseFormProps {
  courseId?: string;
  initialData?: {
    title: string;
    slug: string;
    description: string;
    published: boolean;
    featured_image_path?: string;
    default_media_type?: 'video' | 'audio' | 'mixed' | null;
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Course create/edit form.
 */
export default function CourseForm({ courseId, initialData }: CourseFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [featuredImagePath, setFeaturedImagePath] = useState(
    initialData?.featured_image_path ?? ''
  );
  const [defaultMediaType, setDefaultMediaType] = useState<
    'video' | 'audio' | 'mixed' | null
  >(initialData?.default_media_type ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setTitle(v);
    if (!initialData?.slug || slug === slugify(initialData.title)) {
      setSlug(slugify(v));
    }
  };

  const handleFeaturedImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/course-images', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      setFeaturedImagePath(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed');
    } finally {
      setIsUploadingImage(false);
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
        description: description || null,
        published,
        featured_image_path: featuredImagePath || null,
        default_media_type: defaultMediaType,
      };
      if (courseId) {
        const result = await updateCourse(courseId, payload);
        if (result.error) throw new Error(result.error);
        router.push('/admin/courses');
        router.refresh();
      } else {
        const result = await createCourse(payload);
        if (result.error) throw new Error(result.error);
        if (result.data?.id) {
          router.push(`/admin/courses/${result.data.id}/lessons`);
          router.refresh();
        } else {
          router.push('/admin/courses');
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
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
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
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Featured image
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFeaturedImageUpload}
          disabled={isUploadingImage || isSubmitting}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-bgDark-2/20 file:text-gray-700 hover:file:bg-bgDark-2/30"
        />
        {isUploadingImage && (
          <p className="mt-1 text-sm text-gray-500">Uploading...</p>
        )}
        {featuredImagePath && (
          <p className="mt-1 text-sm text-gray-600">
            Image: {featuredImagePath}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Default media type for lessons
        </label>
        <p className="text-sm text-gray-500 mb-2">
          When adding lessons, this preselects video, audio, or mixed (both) focus.
        </p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mediaType"
              checked={defaultMediaType === null}
              onChange={() => setDefaultMediaType(null)}
              disabled={isSubmitting}
            />
            None
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mediaType"
              checked={defaultMediaType === 'video'}
              onChange={() => setDefaultMediaType('video')}
              disabled={isSubmitting}
            />
            Video
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mediaType"
              checked={defaultMediaType === 'audio'}
              onChange={() => setDefaultMediaType('audio')}
              disabled={isSubmitting}
            />
            Audio
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mediaType"
              checked={defaultMediaType === 'mixed'}
              onChange={() => setDefaultMediaType('mixed')}
              disabled={isSubmitting}
            />
            Mixed
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`${inputClass} min-h-[100px] resize-y`}
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            disabled={isSubmitting}
            className="h-4 w-4 rounded border-gray-300 text-bgDark-1 focus:ring-bgDark-2/60"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700">Published</label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors disabled:opacity-50 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-zen-blue/60"
        >
          {isSubmitting ? 'Saving...' : courseId ? 'Update' : 'Create'}
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
