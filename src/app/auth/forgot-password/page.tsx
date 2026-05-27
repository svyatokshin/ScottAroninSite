'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Forgot password page. Sends reset email via Supabase.
 * User lands on /auth/update-password after clicking the email link.
 */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Email is required');
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError('Enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
        redirectTo: `${window.location.origin}/auth/confirm`,
      });

      if (resetError) throw resetError;

      setMessage('Check your email for a link to reset your password.');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 bg-white text-gray-900 placeholder-gray-500/60 min-h-[44px]';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bgLight-4 via-bgLight-3 to-bgLight-2 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-bgDark-2/20 bg-white/90 backdrop-blur-sm shadow-xl p-8">
          <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-2 text-center">
            Forgot password
          </h1>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                {error}
              </div>
            )}
            {message && (
              <div
                className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800"
                role="status"
              >
                {message}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] focus:outline-none focus:ring-2 focus:ring-zen-blue/60 focus:ring-offset-2"
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            <Link href="/login" className="text-bgDark-2 hover:underline font-medium">
              Back to sign in
            </Link>
          </p>

          <p className="mt-4 text-center text-sm text-gray-500">
            <Link href="/" className="text-bgDark-2 hover:underline">
              Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
