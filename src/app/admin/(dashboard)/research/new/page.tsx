import Link from 'next/link';
import ResearchArticleForm from '@/components/admin/ResearchArticleForm';

export default function NewResearchArticlePage() {
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
        New Research Article
      </h1>
      <ResearchArticleForm />
    </div>
  );
}
