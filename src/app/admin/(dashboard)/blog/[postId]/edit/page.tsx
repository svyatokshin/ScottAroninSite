import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import BlogPostForm from '@/components/admin/BlogPostForm';

/**
 * Edit blog post page.
 */
export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
        Edit Blog Post
      </h1>
      <BlogPostForm
        postId={post.id}
        initialData={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? '',
          content: post.content ?? '',
          featured_image_path: post.featured_image_path ?? '',
          published: post.published,
          published_at: post.published_at ?? '',
        }}
      />
    </div>
  );
}
