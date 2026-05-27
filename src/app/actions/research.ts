'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSupabase } from '@/lib/auth/master';

export type ResearchSection = 'mind-body' | 'fitness' | 'nutrition';

export interface ResearchFindingInput {
  finding: string;
  description: string;
  source: string;
}

export interface ResearchStatisticInput {
  statistic: string;
  context: string;
  source: string;
}

export interface ResearchStudyInput {
  title: string;
  authors: string;
  year: number;
  journal: string;
  url: string;
}

export interface ResearchArticleInput {
  section: ResearchSection;
  title: string;
  summary?: string;
  key_findings: ResearchFindingInput[];
  statistics: ResearchStatisticInput[];
  related_studies: ResearchStudyInput[];
  sort_order?: number;
}

export interface ResearchArticle {
  id: string;
  section: ResearchSection;
  title: string;
  summary: string | null;
  key_findings: ResearchFindingInput[];
  statistics: ResearchStatisticInput[];
  related_studies: ResearchStudyInput[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const REVALIDATE_PATHS = ['/admin/research', '/research'];

function revalidateResearch() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

export async function getResearchArticles(
  section?: ResearchSection,
): Promise<{ data?: ResearchArticle[]; error?: string }> {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  let query = auth.supabase
    .from('research_articles')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (section) {
    query = query.eq('section', section);
  }

  const { data, error } = await query;
  if (error) return { error: error.message };
  return { data: data as ResearchArticle[] };
}

export async function getResearchArticle(
  id: string,
): Promise<{ data?: ResearchArticle; error?: string }> {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { data, error } = await auth.supabase
    .from('research_articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return { error: error.message };
  return { data: data as ResearchArticle };
}

export async function createResearchArticle(input: ResearchArticleInput) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { data, error } = await auth.supabase
    .from('research_articles')
    .insert({
      section: input.section,
      title: input.title,
      summary: input.summary ?? null,
      key_findings: input.key_findings,
      statistics: input.statistics,
      related_studies: input.related_studies,
      sort_order: input.sort_order ?? 0,
      updated_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (error) return { error: error.message };
  revalidateResearch();
  return { data: { id: data.id } };
}

export async function updateResearchArticle(
  id: string,
  input: ResearchArticleInput,
) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { error } = await auth.supabase
    .from('research_articles')
    .update({
      section: input.section,
      title: input.title,
      summary: input.summary ?? null,
      key_findings: input.key_findings,
      statistics: input.statistics,
      related_studies: input.related_studies,
      sort_order: input.sort_order ?? 0,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) return { error: error.message };
  revalidateResearch();
  return {};
}

export async function deleteResearchArticle(id: string) {
  const auth = await getAdminSupabase();
  if (!auth) return { error: 'Unauthorized' };

  const { error } = await auth.supabase
    .from('research_articles')
    .delete()
    .eq('id', id);

  if (error) return { error: error.message };
  revalidateResearch();
  return {};
}
