import BlogPostForm from '@/components/admin/BlogPostForm';

/**
 * New blog post page.
 */
export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
        New Blog Post
      </h1>
      <BlogPostForm />
    </div>
  );
}
