-- Allow courses to be self-enrollable (free enrollment by users)
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS self_enroll_enabled BOOLEAN NOT NULL DEFAULT false;

-- Users can self-enroll in courses where self_enroll_enabled is true
CREATE POLICY "Users can self-enroll in enabled courses" ON public.course_enrollments
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = course_id
        AND c.published = true
        AND c.self_enroll_enabled = true
    )
  );
