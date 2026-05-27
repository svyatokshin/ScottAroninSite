import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Public blog list page with featured article and editorial grid.
 */
export default async function BlogListPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image_path, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const publishedPosts = posts ?? [];
  const [featuredPost, ...otherPosts] = publishedPosts;

  function getImageUrl(path: string | null) {
    if (!path) return null;
    const baseUrl = supabaseUrl.replace(/\/+$/, '');
    return `${baseUrl}/storage/v1/object/public/blog-images/${path}`;
  }

  function formatPublishedDate(value: string | null) {
    if (!value) return 'Unscheduled';
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function getReadingTime(excerpt: string | null) {
    if (!excerpt?.trim()) return '3 min read';
    const wordCount = excerpt.trim().split(/\s+/).length;
    return `${Math.max(3, Math.ceil(wordCount / 45))} min read`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgLight-4 via-white to-bgLight-3 py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <section className="mb-14 text-center sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Scott Aronin Journal
          </p>
          <h1 className="mx-auto max-w-4xl font-playfair text-4xl font-light leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Modern Wellness Insights for a More Centered Life
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-gray-700 sm:text-lg">
            Thoughtful writing on integrated health, practical habits, and evidence-informed
            strategies for mind-body performance.
          </p>
        </section>

        {featuredPost && (
          <section className="mb-12 sm:mb-16">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-bgDark-2/20 bg-white shadow-[0_20px_50px_-18px_rgba(0,70,201,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_-22px_rgba(0,70,201,0.3)]"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[260px] bg-gradient-to-br from-bgLight-3 to-bgLight-4 sm:min-h-[360px]">
                  {getImageUrl(featuredPost.featured_image_path) ? (
                    <Image
                      src={getImageUrl(featuredPost.featured_image_path) as string}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(0,70,201,0.12),transparent_40%)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent lg:bg-gradient-to-r lg:from-black/35 lg:to-transparent" />
                  <span className="absolute left-5 top-5 inline-flex rounded-full border border-white/40 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                    Featured
                  </span>
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="text-sm text-gray-500">
                    {formatPublishedDate(featuredPost.published_at)} · {getReadingTime(featuredPost.excerpt)}
                  </p>
                  <h2 className="mt-3 font-playfair text-3xl font-light leading-tight text-gray-900 sm:text-4xl">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="mt-4 text-base leading-relaxed text-gray-700 line-clamp-4">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <span className="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.12em] text-[#1C6ED5]">
                    Read article
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {otherPosts.length > 0 && (
          <section>
            <div className="mb-6 flex items-end justify-between gap-3">
              <h3 className="font-playfair text-2xl font-light text-gray-900 sm:text-3xl">
                Latest Articles
              </h3>
              <p className="text-sm text-gray-500">{otherPosts.length} stories</p>
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {otherPosts.map((post) => {
                const imageUrl = getImageUrl(post.featured_image_path);
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-bgDark-2/15 bg-white shadow-[0_12px_35px_-18px_rgba(17,24,39,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-bgDark-2/30 hover:shadow-[0_18px_48px_-20px_rgba(0,70,201,0.28)]"
                  >
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-bgLight-3 to-bgLight-4">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.7),transparent_45%),radial-gradient(circle_at_80%_85%,rgba(0,70,201,0.12),transparent_45%)]" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-sm text-gray-500">
                        {formatPublishedDate(post.published_at)} · {getReadingTime(post.excerpt)}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold leading-snug text-gray-900 transition-colors group-hover:text-bgDark-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 line-clamp-3 text-gray-600">{post.excerpt}</p>
                      )}
                      <span className="mt-6 inline-flex items-center text-sm font-semibold text-[#1C6ED5]">
                        Continue reading →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {publishedPosts.length === 0 && (
          <div className="rounded-3xl border border-bgDark-2/20 bg-white p-12 text-center shadow-sm">
            <h2 className="font-playfair text-3xl font-light text-gray-900">
              Journal Launching Soon
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              We&apos;re preparing a high-quality reading experience with practical wellness
              insights and in-depth guidance. Check back shortly for the first posts.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-zen-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-zen-blue-dark"
            >
              Contact Scott
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
