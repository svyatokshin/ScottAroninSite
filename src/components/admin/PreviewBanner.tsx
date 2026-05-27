'use client';

import Link from 'next/link';

interface PreviewBannerProps {
  /** Admin edit page URL for "Exit Preview" link */
  returnHref: string;
}

/**
 * Sticky banner shown when admin previews draft content in user view.
 * Uses Antreva brand colors (Midnight Navy #0B132B, Tech Blue #1C6ED5).
 */
export default function PreviewBanner({ returnHref }: PreviewBannerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Preview mode active"
      className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-3 bg-[#0B132B] text-white text-sm"
    >
      <span className="font-medium">Preview Mode — Draft Content</span>
      <Link
        href={returnHref}
        className="font-semibold text-[#1C6ED5] hover:text-[#5a9cf5] underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0B132B] rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
        aria-label="Exit preview and return to admin"
      >
        Exit Preview
      </Link>
    </div>
  );
}
