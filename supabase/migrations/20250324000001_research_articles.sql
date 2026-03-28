-- Research articles: admin-managed content for the public /research page.
-- Each row is one article belonging to a section (mind-body, fitness, or nutrition).
-- Nested data (findings, statistics, studies) stored as JSONB arrays.

CREATE TABLE public.research_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT NOT NULL CHECK (section IN ('mind-body', 'fitness', 'nutrition')),
  title TEXT NOT NULL,
  summary TEXT,
  key_findings JSONB NOT NULL DEFAULT '[]'::jsonb,
  statistics JSONB NOT NULL DEFAULT '[]'::jsonb,
  related_studies JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_research_articles_section ON public.research_articles(section);
CREATE INDEX idx_research_articles_sort ON public.research_articles(sort_order);

ALTER TABLE public.research_articles ENABLE ROW LEVEL SECURITY;

-- Public can read all articles (displayed on the public research page)
CREATE POLICY "Public can read research articles" ON public.research_articles
  FOR SELECT USING (true);

-- Admins can manage articles
CREATE POLICY "Admins can manage research articles" ON public.research_articles
  FOR ALL USING (public.current_user_is_admin());
