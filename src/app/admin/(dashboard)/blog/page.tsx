import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import BlogPostActions from '@/components/admin/BlogPostActions';

/**
 * Admin blog post list page.
 */
export default async function AdminBlogListPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, published, published_at, created_at')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-semibold text-gray-900">
          Blog Posts
        </h1>
        <Link
          href="/admin/blog/new"
          className="px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors min-h-[44px] flex items-center"
        >
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-bgDark-2/20 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts?.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-bgDark-2 hover:underline font-medium"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <BlogPostActions postId={post.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!posts || posts.length === 0) && (
          <div className="px-6 py-12 text-center text-gray-500">
            No blog posts yet.{' '}
            <Link href="/admin/blog/new" className="text-bgDark-2 hover:underline">
              Create one
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
