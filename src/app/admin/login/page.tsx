'use client';

import { useState } from 'react';
import Link from 'next/link';

const API_LOGIN = '/api/auth/admin-login';
const API_MASTER_LOGIN = '/api/auth/master-login';

/**
 * Admin login page. Standard Supabase auth or master bypass (env-configured).
 */
export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMaster, setShowMaster] = useState(false);
  const [masterError, setMasterError] = useState<string | null>(null);
  const [masterLoading, setMasterLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (!email || !password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(API_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Sign in failed');
        return;
      }

      window.location.href = '/admin';
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMasterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMasterError(null);
    setMasterLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem('master-email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('master-password') as HTMLInputElement).value;

    if (!email || !password) {
      setMasterError('Email and password are required');
      setMasterLoading(false);
      return;
    }

    try {
      const res = await fetch(API_MASTER_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMasterError(typeof data.error === 'string' ? data.error : 'Master login failed');
        return;
      }

      window.location.href = '/admin';
      return;
    } catch (err) {
      setMasterError(err instanceof Error ? err.message : 'Master login failed');
    } finally {
      setMasterLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bgLight-4 via-bgLight-3 to-bgLight-2 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-bgDark-2/20 bg-white/90 backdrop-blur-sm shadow-xl p-8">
          <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-2 text-center">
            Admin Login
          </h1>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Scott Aronin — Course & Blog Management
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

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-3 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 bg-white text-gray-900 placeholder-gray-500/60 min-h-[44px]"
                placeholder="admin@example.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-bgDark-2 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 bg-white text-gray-900 placeholder-gray-500/60 min-h-[44px]"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] focus:outline-none focus:ring-2 focus:ring-zen-blue/60 focus:ring-offset-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-bgDark-2/20">
            <button
              type="button"
              onClick={() => setShowMaster(!showMaster)}
              className="text-sm text-bgDark-2 hover:underline"
            >
              {showMaster ? 'Hide' : 'Emergency access'}
            </button>
            {showMaster && (
              <form
                onSubmit={handleMasterSubmit}
                className="mt-4 space-y-4 p-4 rounded-lg bg-gray-50 border border-bgDark-2/10"
              >
                {masterError && (
                  <div
                    className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800"
                    role="alert"
                  >
                    {masterError}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="master-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Master email
                  </label>
                  <input
                    id="master-email"
                    name="master-email"
                    type="email"
                    autoComplete="email"
                    className="w-full px-4 py-3 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 bg-white text-gray-900 min-h-[44px]"
                    placeholder="master@example.com"
                    disabled={masterLoading}
                  />
                </div>
                <div>
                  <label
                    htmlFor="master-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Master password
                  </label>
                  <input
                    id="master-password"
                    name="master-password"
                    type="password"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 bg-white text-gray-900 min-h-[44px]"
                    disabled={masterLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={masterLoading}
                  className="w-full py-2 rounded-lg font-medium text-gray-700 bg-white border border-bgDark-2/30 hover:bg-gray-50 transition-colors disabled:opacity-50 min-h-[40px]"
                >
                  {masterLoading ? 'Signing in...' : 'Master Sign In'}
                </button>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            <Link href="/" className="text-bgDark-2 hover:underline">
              Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
