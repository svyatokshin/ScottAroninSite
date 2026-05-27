/**
 * Extracts YouTube video ID from various URL formats and returns embed URL.
 * Returns empty string if not a valid YouTube URL.
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
}

/** Returns true if the path/URL appears to be a YouTube link. */
export function isYouTubeUrl(path: string | null): boolean {
  if (!path) return false;
  return /youtube\.com|youtu\.be/i.test(path);
}
