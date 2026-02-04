-- Add onboarding tracking to profiles for post-signup flow
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ;
