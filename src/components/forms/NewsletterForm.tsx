'use client';

import { useState, useTransition } from 'react';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

interface NewsletterFormProps {
  /** Identifier saved with the subscription (defaults to "home_page"). */
  source?: string;
}

/**
 * "Stay Connected" newsletter form. Saves the email to the
 * `newsletter_subscribers` Supabase table via a server action.
 */
export default function NewsletterForm({ source = 'home_page' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const formData = new FormData();
    formData.set('email', email);
    formData.set('source', source);

    startTransition(async () => {
      const result = await subscribeToNewsletter(formData);
      if (result.error) {
        setStatus({ type: 'error', message: result.error });
        return;
      }
      setStatus({
        type: 'success',
        message: result.message ?? 'Thanks for subscribing!',
      });
      setEmail('');
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-6 justify-center items-center"
        aria-label="Newsletter signup form"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isPending}
          className="px-8 py-4 rounded-full border border-bgDark-2/50 bg-white/80 text-gray-800 placeholder-gray-500/60 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 font-light backdrop-blur-sm min-w-[300px] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-3 bg-bgDark-2/20 border border-bgDark-2/50 px-8 py-3 rounded-full font-semibold text-gray-800 shadow-xl hover:bg-bgDark-2/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 disabled:opacity-60 disabled:hover:scale-100"
          style={{ boxShadow: '0 4px 32px 0 rgba(0,70,201,0.25)' }}
        >
          {isPending ? 'Joining...' : 'Join the Community'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-800 transition-colors"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </form>

      {status && (
        <p
          className={`mt-4 text-sm ${
            status.type === 'error' ? 'text-red-600' : 'text-green-700'
          }`}
          role={status.type === 'error' ? 'alert' : 'status'}
        >
          {status.message}
        </p>
      )}
    </div>
  );
}
