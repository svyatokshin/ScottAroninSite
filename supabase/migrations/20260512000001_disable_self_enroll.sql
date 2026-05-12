-- Disable legacy self-enrollment now that premium subscriptions gate access.
UPDATE public.courses
SET self_enroll_enabled = false
WHERE self_enroll_enabled = true;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'course_enrollments'
      AND policyname = 'Users can self-enroll in enabled courses'
  ) THEN
    ALTER POLICY "Users can self-enroll in enabled courses" ON public.course_enrollments
      WITH CHECK (false);
  END IF;
END
$$;
