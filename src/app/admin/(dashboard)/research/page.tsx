import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ResearchArticleActions from '@/components/admin/ResearchArticleActions';
import ResearchSectionTabs from '@/components/admin/ResearchSectionTabs';

const SECTION_LABELS: Record<string, string> = {
  'mind-body': 'Mind-Body',
  fitness: 'Fitness',
  nutrition: 'Nutrition',
};

interface AdminResearchPageProps {
  searchParams: Promise<{ section?: string }>;
}

export default async function AdminResearchPage({
  searchParams,
}: AdminResearchPageProps) {
  const { section } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('research_articles')
    .select('id, title, section, sort_order, created_at, updated_at')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (section && ['mind-body', 'fitness', 'nutrition'].includes(section)) {
    query = query.eq('section', section);
  }

  const { data: articles } = await query;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-serif font-semibold text-gray-900">
          Research Articles
        </h1>
        <Link
          href="/admin/research/new"
          className="px-6 py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors min-h-[44px] flex items-center justify-center"
        >
          New Article
        </Link>
      </div>

      <div className="mb-6">
        <ResearchSectionTabs />
      </div>

      <div className="bg-white rounded-xl border border-bgDark-2/20 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles?.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/research/${article.id}/edit`}
                    className="text-bgDark-2 hover:underline font-medium"
                  >
                    {article.title}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {SECTION_LABELS[article.section] ?? article.section}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {article.sort_order}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(article.updated_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <ResearchArticleActions articleId={article.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!articles || articles.length === 0) && (
          <div className="px-6 py-12 text-center text-gray-500">
            No research articles yet.{' '}
            <Link
              href="/admin/research/new"
              className="text-bgDark-2 hover:underline"
            >
              Create one
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
