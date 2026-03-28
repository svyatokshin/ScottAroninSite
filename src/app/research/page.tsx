import { ResearchPage, ResearchSection } from '@/types';
import { researchPageData } from '@/data/static-content';
import { ResearchPageClient } from '@/components/pages/ResearchPageClient';
import { createClient } from '@/lib/supabase/server';

const SECTION_DISPLAY: Record<string, string> = {
  'mind-body': 'mind-body',
  fitness: 'fitness',
  nutrition: 'nutrition',
};

export default async function Research() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from('research_articles')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  let data: ResearchPage;

  if (articles && articles.length > 0) {
    const sections: ResearchSection[] = articles.map((a) => ({
      title: a.title,
      category: SECTION_DISPLAY[a.section] ?? a.section,
      summary: a.summary ?? '',
      keyFindings: (a.key_findings ?? []).map(
        (f: { finding: string; description: string; source: string }) => ({
          finding: f.finding,
          description: f.description,
          source: f.source,
        }),
      ),
      statistics: (a.statistics ?? []).map(
        (s: { statistic: string; context: string; source: string }) => ({
          statistic: s.statistic,
          context: s.context,
          source: s.source,
        }),
      ),
      relatedStudies: (a.related_studies ?? []).map(
        (s: {
          title: string;
          authors: string;
          year: number;
          journal: string;
          url: string;
        }) => ({
          title: s.title,
          authors: s.authors,
          year: s.year,
          journal: s.journal,
          url: s.url,
        }),
      ),
    }));

    data = {
      ...researchPageData,
      researchSections: sections,
    };
  } else {
    data = researchPageData;
  }

  return <ResearchPageClient data={data} />;
} 