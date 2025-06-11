import { getResearchPage } from '@/sanity/queries';
import { ResearchPage } from '@/types/sanity';
import { ResearchPageClient } from '@/components/pages/ResearchPageClient';

async function getData(): Promise<ResearchPage> {
  const data = await getResearchPage();
  console.log('Research page data from Sanity:', data);
  return data;
}

export default async function Research() {
  const data = await getData();
  console.log('Research page component received data:', data);
  return <ResearchPageClient data={data} />;
} 