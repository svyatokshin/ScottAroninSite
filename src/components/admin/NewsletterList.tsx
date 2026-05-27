'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteNewsletterSubscriber } from '@/app/actions/newsletter';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
}

interface NewsletterListProps {
  subscribers: NewsletterSubscriber[];
}

function escapeCsvValue(value: string) {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function buildCsv(rows: NewsletterSubscriber[]) {
  const header = ['email', 'source', 'subscribed_at'];
  const body = rows.map((row) =>
    [
      escapeCsvValue(row.email),
      escapeCsvValue(row.source ?? ''),
      escapeCsvValue(row.created_at),
    ].join(',')
  );
  return [header.join(','), ...body].join('\n');
}

export default function NewsletterList({ subscribers }: NewsletterListProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subscribers;
    return subscribers.filter(
      (subscriber) =>
        subscriber.email.toLowerCase().includes(q) ||
        (subscriber.source ?? '').toLowerCase().includes(q)
    );
  }, [query, subscribers]);

  const handleExport = () => {
    if (filtered.length === 0) return;
    const csv = buildCsv(filtered);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `newsletter-subscribers-${today}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (subscriber: NewsletterSubscriber) => {
    const confirmed = window.confirm(
      `Remove ${subscriber.email} from the newsletter list?`
    );
    if (!confirmed) return;
    setError(null);
    setDeletingId(subscriber.id);
    startTransition(async () => {
      const result = await deleteNewsletterSubscriber(subscriber.id);
      setDeletingId(null);
      if (result.error) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 max-w-md flex-col gap-1">
          <label htmlFor="newsletter-search" className="sr-only">
            Search subscribers
          </label>
          <input
            id="newsletter-search"
            type="search"
            placeholder="Search by email or source"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-bgDark-2 focus:outline-none focus:ring-2 focus:ring-bgDark-2/40"
          />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filtered.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{subscribers.length}</span>{' '}
            subscribers
          </p>
          <button
            type="button"
            onClick={handleExport}
            disabled={filtered.length === 0}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-zen-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zen-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-xl border border-bgDark-2/20 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Subscribed
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filtered.map((subscriber) => {
              const isDeletingRow = isPending && deletingId === subscriber.id;
              return (
                <tr key={subscriber.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 break-all">
                    {subscriber.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {subscriber.source ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(subscriber.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(subscriber)}
                      disabled={isDeletingRow}
                      className="text-sm font-medium text-red-600 transition-colors hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isDeletingRow ? 'Removing...' : 'Remove'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            {subscribers.length === 0
              ? 'No newsletter subscribers yet.'
              : 'No subscribers match your search.'}
          </div>
        )}
      </div>
    </div>
  );
}
