import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Public blog list page. Shows published posts in a card grid.
 */
export default async function BlogListPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image_path, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 mb-2 text-center">
          Blog
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Insights on mind-body wellness, meditation, and holistic health.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts?.map((post) => {
            const imageUrl = post.featured_image_path
              ? `${supabaseUrl}/storage/v1/object/public/blog-images/${post.featured_image_path}`
              : null;

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-bgDark-2/20 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-bgDark-2/30 transition-all"
              >
                {imageUrl && (
                  <div className="relative aspect-video bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''}
                  </p>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-bgDark-2 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-gray-600 line-clamp-3">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {(!posts || posts.length === 0) && (
          <div className="text-center py-16 text-gray-500">
            No blog posts yet. Check back soon.
          </div>
        )}
      </div>
    </div>
  );
}
