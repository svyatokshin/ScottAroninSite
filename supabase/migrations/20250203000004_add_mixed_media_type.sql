-- Add 'mixed' to default_media_type options for courses
-- Add column if missing (in case migration 003 was not applied)
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS default_media_type TEXT;

-- Drop existing check constraint
ALTER TABLE public.courses
  DROP CONSTRAINT IF EXISTS courses_default_media_type_check;

-- Add updated constraint including 'mixed'
ALTER TABLE public.courses
  ADD CONSTRAINT courses_default_media_type_check
  CHECK (default_media_type IS NULL OR default_media_type IN ('video', 'audio', 'mixed'));
