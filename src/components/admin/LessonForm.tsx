'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createLesson, updateLesson } from '@/app/actions/courses';

interface LessonFormProps {
  courseId: string;
  moduleId: string;
  moduleTitle: string;
  lessonId?: string;
  sortOrder?: number;
  /** Preset from course default when creating new lesson. 'mixed' = no preselect. */
  defaultMediaType?: 'video' | 'audio' | 'mixed' | null;
  initialData?: {
    title: string;
    slug: string;
    content: string;
    media_type: 'audio' | 'video' | null;
    media_path: string;
    duration_sec?: number;
    sort_order: number;
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
 * Lesson create/edit form with media upload.
 */
export default function LessonForm({
  courseId,
  moduleId,
  moduleTitle,
  lessonId,
  sortOrder = 0,
  defaultMediaType: courseDefaultMedia,
  initialData,
}: LessonFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [mediaType, setMediaType] = useState<'audio' | 'video' | null>(
    initialData?.media_type ?? (courseDefaultMedia === 'mixed' ? null : (courseDefaultMedia ?? null))
  );
  const initialPath = initialData?.media_path ?? '';
  const [mediaPath, setMediaPath] = useState(initialPath);
  const [mediaUrl, setMediaUrl] = useState(
    initialPath.startsWith('http') ? initialPath : ''
  );
  const [durationSec, setDurationSec] = useState(
    initialData?.duration_sec?.toString() ?? ''
  );
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

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/course-media', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      setMediaPath(data.path);
      setMediaUrl('');
      const isVideo = file.type.startsWith('video/');
      setMediaType(isVideo ? 'video' : 'audio');
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
        content: content || null,
        media_type: mediaType,
        media_path: mediaPath || null,
        duration_sec: durationSec ? parseInt(durationSec, 10) : null,
        sort_order: initialData?.sort_order ?? sortOrder,
      };
      if (lessonId) {
        const result = await updateLesson(lessonId, payload);
        if (result.error) throw new Error(result.error);
      } else {
        const result = await createLesson(moduleId, payload);
        if (result.error) throw new Error(result.error);
      }
      router.push(`/admin/courses/${courseId}/lessons`);
      router.refresh();
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
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className={`${inputClass} min-h-[120px] resize-y`}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-bgDark-2/10">
        <h3 className="text-sm font-semibold text-gray-900">
          Media — Video or Audio
        </h3>
        <p className="text-sm text-gray-500">
          Upload a file or paste a URL. Each lesson supports one video or audio asset.
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Media type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mediaType"
                checked={mediaType === null}
                onChange={() => setMediaType(null)}
                disabled={isSubmitting}
              />
              None
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mediaType"
                checked={mediaType === 'video'}
                onChange={() => setMediaType('video')}
                disabled={isSubmitting}
              />
              Video
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mediaType"
                checked={mediaType === 'audio'}
                onChange={() => setMediaType('audio')}
                disabled={isSubmitting}
              />
              Audio
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload file
          </label>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime,audio/mpeg,audio/wav,audio/webm,audio/mp4"
            onChange={handleMediaUpload}
            disabled={isUploading || isSubmitting}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-bgDark-2/20 file:text-gray-700 hover:file:bg-bgDark-2/30"
          />
          {isUploading && (
            <p className="mt-1 text-sm text-gray-500">Uploading...</p>
          )}
        </div>
        <div>
          <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Or paste URL
          </label>
          <input
            id="mediaUrl"
            type="url"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            onBlur={(e) => {
              const url = (e.target as HTMLInputElement).value.trim();
              if (url && mediaType) setMediaPath(url);
            }}
            placeholder="https://example.com/video.mp4 or direct media URL"
            className={inputClass}
            disabled={isSubmitting}
          />
        </div>
        {mediaPath && (
          <p className="text-sm text-gray-600">
            Current: {mediaPath.length > 60 ? `${mediaPath.slice(0, 60)}…` : mediaPath}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
        <input
          id="duration"
          type="number"
          min={0}
          value={durationSec}
          onChange={(e) => setDurationSec(e.target.value)}
          className={inputClass}
          placeholder="Optional"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors disabled:opacity-50 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-bgDark-2/60"
        >
          {isSubmitting ? 'Saving...' : lessonId ? 'Update' : 'Create'}
        </button>
        <Link
          href={`/admin/courses/${courseId}/lessons`}
          className="px-6 py-3 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors min-h-[44px] flex items-center"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
