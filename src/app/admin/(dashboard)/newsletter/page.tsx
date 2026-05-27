import { redirect } from 'next/navigation';
import { getAdminSupabase } from '@/lib/auth/master';
import NewsletterList, {
  type NewsletterSubscriber,
} from '@/components/admin/NewsletterList';

/**
 * Admin newsletter subscribers page. View, search, export and remove
 * entries captured from public newsletter signup forms.
 */
export default async function AdminNewsletterPage() {
  const auth = await getAdminSupabase();
  if (!auth) {
    redirect('/admin/login');
  }

  const { data, error } = await auth.supabase
    .from('newsletter_subscribers')
    .select('id, email, source, created_at')
    .order('created_at', { ascending: false });

  const subscribers: NewsletterSubscriber[] = (data ?? []).map((row) => ({
    id: row.id as string,
    email: row.email as string,
    source: (row.source ?? null) as string | null,
    created_at: row.created_at as string,
  }));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-gray-900">
            Newsletter Subscribers
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Emails collected from the public &ldquo;Stay Connected&rdquo; form.
          </p>
        </div>
      </div>

      {error && (
        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          Failed to load subscribers: {error.message}
        </p>
      )}

      <NewsletterList subscribers={subscribers} />
    </div>
  );
}
