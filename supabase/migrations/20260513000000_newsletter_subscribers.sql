-- Newsletter subscribers captured from public site forms (e.g. home page "Stay Connected").
-- Only the service role (used from server actions) writes to this table.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS newsletter_subscribers_created_at_idx
  ON public.newsletter_subscribers (created_at DESC);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public newsletter signup: anyone (anon or authenticated) may INSERT,
-- but cannot read, update, or delete rows.
CREATE POLICY "Public can subscribe to newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admin profiles can read and manage subscribers through the regular client.
-- The service role (used in master-cookie admin mode) bypasses RLS automatically.
CREATE POLICY "Admins can manage newsletter subscribers"
  ON public.newsletter_subscribers
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

COMMENT ON TABLE public.newsletter_subscribers IS 'Public newsletter signups (e.g. home page Stay Connected form).';
COMMENT ON COLUMN public.newsletter_subscribers.email IS 'Lower-cased, unique email address of subscriber.';
COMMENT ON COLUMN public.newsletter_subscribers.source IS 'Which form/page captured the signup (e.g. home_page).';
