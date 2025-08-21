import { ResearchPage } from '@/types';
import { researchPageData } from '@/data/static-content';
import { ResearchPageClient } from '@/components/pages/ResearchPageClient';

/**
 * Research page component - now using static data instead of Sanity CMS
 * @returns JSX element for the research page
 */
export default function Research() {
  const data: ResearchPage = researchPageData;
  return <ResearchPageClient data={data} />;
} 