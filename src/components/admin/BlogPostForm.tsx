'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPost, updateBlogPost } from '@/app/actions/blog';
import { FiBold, FiItalic, FiLink, FiList } from 'react-icons/fi';

/** Single source link for form state */
interface SourceLinkRow {
  url: string;
  label: string;
}

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
    source_links?: Array<{ url: string; label?: string }>;
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
  const [sourceLinks, setSourceLinks] = useState<SourceLinkRow[]>(() => {
    const links = initialData?.source_links ?? [];
    if (links.length === 0) return [{ url: '', label: '' }];
    return links.map((s) => ({ url: s.url, label: s.label ?? '' }));
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Toggle or apply wrap formatting (bold/italic). If selection is already wrapped with before/after, remove it; otherwise wrap.
   */
  const applyWrapFormatting = (before: string, after: string = before) => {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end);
    const isAlreadyWrapped =
      selected.length >= before.length + after.length &&
      selected.startsWith(before) &&
      selected.endsWith(after);
    let newContent: string;
    let newStart: number;
    let newEnd: number;
    if (isAlreadyWrapped) {
      const inner = selected.slice(before.length, selected.length - after.length);
      newContent = content.slice(0, start) + inner + content.slice(end);
      newStart = start;
      newEnd = start + inner.length;
    } else {
      newContent = content.slice(0, start) + before + selected + after + content.slice(end);
      newStart = start + before.length;
      newEnd = newStart + selected.length;
    }
    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(newStart, newEnd);
    }, 0);
  };

  /**
   * Toggle or apply line-prefix formatting (H2, H3, bullet). If the line at selection starts with prefix, remove it; otherwise add it.
   */
  const applyPrefixFormatting = (prefix: string) => {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = content.slice(0, start).lastIndexOf('\n') + 1;
    const lineEnd = content.indexOf('\n', lineStart);
    const lineEndIndex = lineEnd === -1 ? content.length : lineEnd;
    const line = content.slice(lineStart, lineEndIndex);
    const hasPrefix = line.startsWith(prefix);
    let newContent: string;
    let newCursor: number;
    if (hasPrefix) {
      newContent = content.slice(0, lineStart) + line.slice(prefix.length) + content.slice(lineEndIndex);
      newCursor = Math.max(lineStart, start - prefix.length);
    } else {
      newContent = content.slice(0, lineStart) + prefix + line + content.slice(lineEndIndex);
      newCursor = start + prefix.length;
    }
    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(newCursor, newCursor);
    }, 0);
  };

  /**
   * Toggle or apply link formatting. If selection looks like [text](url), strip to text; otherwise wrap with [](url).
   */
  const applyLinkFormatting = () => {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end);
    const linkMatch = selected.match(/^\[(.+)\]\(.+\)$/);
    let newContent: string;
    let newStart: number;
    let newEnd: number;
    if (linkMatch) {
      const innerText = linkMatch[1];
      newContent = content.slice(0, start) + innerText + content.slice(end);
      newStart = start;
      newEnd = start + innerText.length;
    } else {
      newContent = content.slice(0, start) + '[' + selected + '](url)' + content.slice(end);
      newStart = start + 1;
      newEnd = newStart + selected.length;
    }
    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(newStart, newEnd);
    }, 0);
  };

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
        source_links: sourceLinks
          .filter((s) => s.url.trim())
          .map((s) => ({ url: s.url.trim(), label: s.label.trim() || undefined })),
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
        <div className="flex flex-wrap items-center gap-1 p-2 rounded-t-lg border border-b-0 border-bgDark-2/50 bg-gray-100/80">
          <span className="hidden md:inline text-xs text-gray-500 mr-1">Format:</span>
          <button
            type="button"
            onClick={() => applyWrapFormatting('**', '**')}
            disabled={isSubmitting}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Bold (toggle)"
            aria-label="Bold"
          >
            <FiBold size={18} className="font-bold" />
          </button>
          <button
            type="button"
            onClick={() => applyWrapFormatting('*', '*')}
            disabled={isSubmitting}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Italic (toggle)"
            aria-label="Italic"
          >
            <FiItalic size={18} />
          </button>
          <button
            type="button"
            onClick={() => applyPrefixFormatting('## ')}
            disabled={isSubmitting}
            className="px-2 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Heading 2 (toggle)"
            aria-label="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => applyPrefixFormatting('### ')}
            disabled={isSubmitting}
            className="px-2 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Heading 3 (toggle)"
            aria-label="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => applyPrefixFormatting('- ')}
            disabled={isSubmitting}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Bullet list (toggle)"
            aria-label="Bullet list"
          >
            <FiList size={18} />
          </button>
          <button
            type="button"
            onClick={applyLinkFormatting}
            disabled={isSubmitting}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Link (toggle)"
            aria-label="Insert or remove link"
          >
            <FiLink size={18} />
          </button>
        </div>
        <textarea
          ref={contentRef}
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className={`${inputClass} min-h-[200px] resize-y rounded-t-none`}
          disabled={isSubmitting}
          placeholder="Write your post. Use the buttons above for bold, italic, headings, and links."
        />
      </div>

      {/* Source links: separate section for references */}
      <div className="rounded-xl border border-bgDark-2/20 bg-gray-50/50 p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">Source links</h3>
        <p className="text-xs text-gray-500">
          Add URLs and optional labels for references or sources. Entries with an empty URL are ignored.
        </p>
        {sourceLinks.map((link, index) => (
          <div key={index} className="flex flex-wrap items-start gap-2">
            <input
              type="url"
              value={link.url}
              onChange={(e) => {
                const next = [...sourceLinks];
                next[index] = { ...next[index], url: e.target.value };
                setSourceLinks(next);
              }}
              placeholder="https://..."
              className={`${inputClass} flex-1 min-w-[200px]`}
              disabled={isSubmitting}
              aria-label={`Source link ${index + 1} URL`}
            />
            <input
              type="text"
              value={link.label}
              onChange={(e) => {
                const next = [...sourceLinks];
                next[index] = { ...next[index], label: e.target.value };
                setSourceLinks(next);
              }}
              placeholder="Label (optional)"
              className={`${inputClass} flex-1 min-w-[140px] max-w-[220px]`}
              disabled={isSubmitting}
              aria-label={`Source link ${index + 1} label`}
            />
            <button
              type="button"
              onClick={() => {
                const next = sourceLinks.filter((_, i) => i !== index);
                setSourceLinks(next.length ? next : [{ url: '', label: '' }]);
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors disabled:opacity-50 min-h-[44px]"
              disabled={isSubmitting}
              aria-label={`Remove source link ${index + 1}`}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSourceLinks([...sourceLinks, { url: '', label: '' }])}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          Add source link
        </button>
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
          className="px-6 py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors disabled:opacity-50 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-zen-blue/60"
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
