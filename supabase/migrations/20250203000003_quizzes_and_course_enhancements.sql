-- Quiz questions and course enhancements (featured image, default media type)
-- Run via Supabase CLI: supabase db push

-- Add course columns for robust course creation
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS featured_image_path TEXT,
  ADD COLUMN IF NOT EXISTS default_media_type TEXT CHECK (default_media_type IN ('video', 'audio'));

-- Quiz questions: mini-quizzes attached to lessons for engagement
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false')),
  options JSONB NOT NULL DEFAULT '[]',
  sort_order INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_lesson ON public.quiz_questions(lesson_id);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enrolled users can read quiz questions" ON public.quiz_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.lessons l
      JOIN public.modules m ON m.id = l.module_id
      JOIN public.course_enrollments ce ON ce.course_id = m.course_id
      WHERE l.id = quiz_questions.lesson_id AND ce.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage quiz questions" ON public.quiz_questions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- course-images bucket for course featured images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-images',
  'course-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read course-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'course-images');

CREATE POLICY "Admins can upload course-images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'course-images'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update course-images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'course-images'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete course-images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'course-images'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
