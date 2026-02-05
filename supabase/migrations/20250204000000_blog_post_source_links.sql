-- Add source links to blog posts (array of { url, label? })
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS source_links JSONB NOT NULL DEFAULT '[]';

COMMENT ON COLUMN public.blog_posts.source_links IS 'Array of { "url": string, "label"?: string } for references/sources';
