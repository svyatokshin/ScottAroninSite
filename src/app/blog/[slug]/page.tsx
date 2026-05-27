import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MarkdownContent from '@/components/blog/MarkdownContent';
import PreviewBanner from '@/components/admin/PreviewBanner';

/**
 * Public blog post single page.
 * Admins can use ?preview=true to view draft content.
 */
export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string; returnTo?: string }>;
}) {
  const { slug } = await params;
  const { preview, returnTo } = await searchParams;
  const supabase = await createClient();

  const isPreview = preview === 'true';
  let isAdmin = false;
  if (isPreview) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      isAdmin = profile?.role === 'admin';
    }
  }

  const postQuery = supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug);

  if (!isPreview || !isAdmin) {
    postQuery.eq('published', true);
  }

  const { data: post } = await postQuery.single();

  if (!post) notFound();

  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/+$/, '');
  const imageUrl = post.featured_image_path
    ? `${supabaseUrl}/storage/v1/object/public/blog-images/${post.featured_image_path}`
    : null;
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unscheduled';
  const wordsInContent = (post.content ?? '').trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(3, Math.ceil(wordsInContent / 220));
  const showPreviewBanner = isPreview && isAdmin;
  const returnHref = (returnTo && returnTo.startsWith('/admin')) ? returnTo : `/admin/blog/${post.id}/edit`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgLight-4 via-white to-bgLight-3 py-14 sm:py-20">
      {showPreviewBanner && <PreviewBanner returnHref={returnHref} />}
      <article className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 sm:mb-10">
          <Link
            href="/blog"
            className="inline-flex min-h-[44px] items-center rounded-full border border-bgDark-2/20 bg-white/90 px-4 py-2 text-sm font-medium text-[#1C6ED5] transition-colors hover:bg-[#1C6ED5]/10"
          >
            ← Back to Journal
          </Link>
        </div>

        <header className="mx-auto mb-10 max-w-4xl text-center sm:mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Scott Aronin Journal
          </p>
          <h1 className="font-playfair text-4xl font-light leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-700 sm:text-xl">
              {post.excerpt}
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 sm:gap-3">
            <span>{publishedDate}</span>
            <span aria-hidden>•</span>
            <span>{readingMinutes} min read</span>
          </div>
        </header>

        {imageUrl && (
          <div className="relative mb-10 aspect-[16/8] overflow-hidden rounded-3xl border border-bgDark-2/20 shadow-[0_24px_70px_-30px_rgba(0,70,201,0.35)] sm:mb-12">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        )}

        <section className="rounded-3xl border border-bgDark-2/15 bg-white p-6 shadow-[0_20px_55px_-28px_rgba(17,24,39,0.28)] sm:p-10 lg:p-12">
          <MarkdownContent content={post.content ?? ''} />
        </section>

        {Array.isArray(post.source_links) && post.source_links.length > 0 && (
          <section
            className="mt-10 rounded-2xl border border-bgDark-2/15 bg-white p-6 shadow-sm sm:p-8"
            aria-label="Sources"
          >
            <h2 className="mb-4 font-playfair text-2xl font-light text-gray-900">Sources</h2>
            <ul className="space-y-3">
              {(post.source_links as Array<{ url: string; label?: string }>).map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-2 text-[#1C6ED5] transition-colors hover:text-[#1558ab]"
                  >
                    <span className="mt-0.5 text-xs">↗</span>
                    <span className="underline-offset-2 group-hover:underline">
                      {s.label?.trim() || s.url}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10 pb-2 text-center">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-zen-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-zen-blue-dark"
          >
            Book a 1:1 Session
          </Link>
        </div>
      </article>
    </div>
  );
}
