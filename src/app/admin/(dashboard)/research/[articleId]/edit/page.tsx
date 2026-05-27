import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ResearchArticleForm from '@/components/admin/ResearchArticleForm';

interface EditResearchArticlePageProps {
  params: Promise<{ articleId: string }>;
}

export default async function EditResearchArticlePage({
  params,
}: EditResearchArticlePageProps) {
  const { articleId } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from('research_articles')
    .select('*')
    .eq('id', articleId)
    .single();

  if (!article) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/research"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          &larr; Back to Research
        </Link>
      </div>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
        Edit Research Article
      </h1>
      <ResearchArticleForm
        articleId={articleId}
        initialData={{
          section: article.section,
          title: article.title,
          summary: article.summary ?? '',
          key_findings: article.key_findings ?? [],
          statistics: article.statistics ?? [],
          related_studies: article.related_studies ?? [],
          sort_order: article.sort_order ?? 0,
        }}
      />
    </div>
  );
}
