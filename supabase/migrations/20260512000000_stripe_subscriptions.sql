-- Stripe subscription support for premium course access
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive',
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON public.user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_customer ON public.user_subscriptions(stripe_customer_id);

ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_subscriptions'
      AND policyname = 'Users can read own subscriptions'
  ) THEN
    CREATE POLICY "Users can read own subscriptions" ON public.user_subscriptions
      FOR SELECT USING (user_id = auth.uid());
  END IF;
END
$$;

-- Expand access policies: premium subscribers can access all course materials.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'modules'
      AND policyname = 'Enrolled users can read modules'
  ) THEN
    ALTER POLICY "Enrolled users can read modules" ON public.modules
      USING (
        EXISTS (
          SELECT 1
          FROM public.course_enrollments ce
          WHERE ce.course_id = modules.course_id
            AND ce.user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1
          FROM public.user_subscriptions us
          WHERE us.user_id = auth.uid()
            AND us.status IN ('active', 'trialing')
            AND (us.current_period_end IS NULL OR us.current_period_end > NOW())
        )
      );
  ELSE
    CREATE POLICY "Enrolled users can read modules" ON public.modules
      FOR SELECT USING (
        EXISTS (
          SELECT 1
          FROM public.course_enrollments ce
          WHERE ce.course_id = modules.course_id
            AND ce.user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1
          FROM public.user_subscriptions us
          WHERE us.user_id = auth.uid()
            AND us.status IN ('active', 'trialing')
            AND (us.current_period_end IS NULL OR us.current_period_end > NOW())
        )
      );
  END IF;
END
$$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'lessons'
      AND policyname = 'Enrolled users can read lessons'
  ) THEN
    ALTER POLICY "Enrolled users can read lessons" ON public.lessons
      USING (
        EXISTS (
          SELECT 1
          FROM public.modules m
          JOIN public.course_enrollments ce ON ce.course_id = m.course_id
          WHERE m.id = lessons.module_id
            AND ce.user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1
          FROM public.modules m
          JOIN public.user_subscriptions us ON us.user_id = auth.uid()
          WHERE m.id = lessons.module_id
            AND us.status IN ('active', 'trialing')
            AND (us.current_period_end IS NULL OR us.current_period_end > NOW())
        )
      );
  ELSE
    CREATE POLICY "Enrolled users can read lessons" ON public.lessons
      FOR SELECT USING (
        EXISTS (
          SELECT 1
          FROM public.modules m
          JOIN public.course_enrollments ce ON ce.course_id = m.course_id
          WHERE m.id = lessons.module_id
            AND ce.user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1
          FROM public.modules m
          JOIN public.user_subscriptions us ON us.user_id = auth.uid()
          WHERE m.id = lessons.module_id
            AND us.status IN ('active', 'trialing')
            AND (us.current_period_end IS NULL OR us.current_period_end > NOW())
        )
      );
  END IF;
END
$$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'quiz_questions'
      AND policyname = 'Enrolled users can read quiz questions'
  ) THEN
    ALTER POLICY "Enrolled users can read quiz questions" ON public.quiz_questions
      USING (
        EXISTS (
          SELECT 1
          FROM public.lessons l
          JOIN public.modules m ON m.id = l.module_id
          JOIN public.course_enrollments ce ON ce.course_id = m.course_id
          WHERE l.id = quiz_questions.lesson_id
            AND ce.user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1
          FROM public.lessons l
          JOIN public.modules m ON m.id = l.module_id
          JOIN public.user_subscriptions us ON us.user_id = auth.uid()
          WHERE l.id = quiz_questions.lesson_id
            AND us.status IN ('active', 'trialing')
            AND (us.current_period_end IS NULL OR us.current_period_end > NOW())
        )
      );
  ELSE
    CREATE POLICY "Enrolled users can read quiz questions" ON public.quiz_questions
      FOR SELECT USING (
        EXISTS (
          SELECT 1
          FROM public.lessons l
          JOIN public.modules m ON m.id = l.module_id
          JOIN public.course_enrollments ce ON ce.course_id = m.course_id
          WHERE l.id = quiz_questions.lesson_id
            AND ce.user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1
          FROM public.lessons l
          JOIN public.modules m ON m.id = l.module_id
          JOIN public.user_subscriptions us ON us.user_id = auth.uid()
          WHERE l.id = quiz_questions.lesson_id
            AND us.status IN ('active', 'trialing')
            AND (us.current_period_end IS NULL OR us.current_period_end > NOW())
        )
      );
  END IF;
END
$$;
