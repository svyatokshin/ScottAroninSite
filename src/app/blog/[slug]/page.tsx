import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MarkdownContent from '@/components/blog/MarkdownContent';

/**
 * Public blog post single page.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!post) notFound();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const imageUrl = post.featured_image_path
    ? `${supabaseUrl}/storage/v1/object/public/blog-images/${post.featured_image_path}`
    : null;

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-bgDark-2 hover:underline text-sm mb-8"
        >
          ← Back to Blog
        </Link>

        <header className="mb-8">
          <p className="text-sm text-gray-500 mb-2">
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-xl text-gray-600">{post.excerpt}</p>
          )}
        </header>

        {imageUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <MarkdownContent content={post.content ?? ''} />
        </div>

        {Array.isArray(post.source_links) && post.source_links.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200" aria-label="Sources">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Sources</h2>
            <ul className="space-y-2">
              {(post.source_links as Array<{ url: string; label?: string }>).map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1C6ED5] hover:underline"
                  >
                    {s.label?.trim() || s.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
