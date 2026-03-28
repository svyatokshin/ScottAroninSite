'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deleteResearchArticle } from '@/app/actions/research';

interface ResearchArticleActionsProps {
  articleId: string;
}

export default function ResearchArticleActions({
  articleId,
}: ResearchArticleActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Delete this research article?')) return;
    setIsDeleting(true);
    const result = await deleteResearchArticle(articleId);
    if (result.error) {
      alert(result.error);
    } else {
      router.refresh();
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin/research/${articleId}/edit`}
        className="text-sm text-bgDark-2 hover:underline"
      >
        Edit
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-sm text-red-600 hover:underline disabled:opacity-50"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
