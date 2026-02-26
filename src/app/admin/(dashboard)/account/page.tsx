'use client';

import { useState } from 'react';

const API_CHANGE_PASSWORD = '/api/auth/admin-change-password';

const MIN_PASSWORD_LENGTH = 6;

/**
 * Admin account page: change password form.
 * Requires current password and new password (with confirm).
 */
export default function AdminAccountPage() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    const form = e.currentTarget;
    const currentPassword = (form.elements.namedItem('currentPassword') as HTMLInputElement)
      ?.value ?? '';
    const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement)?.value ?? '';
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement)
      ?.value ?? '';

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`New password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(API_CHANGE_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Failed to change password');
        return;
      }

      setMessage('Password updated successfully.');
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-2">Account</h1>
      <p className="text-gray-600 text-sm mb-6">Change your admin password.</p>

      <div className="rounded-2xl border border-bgDark-2/20 bg-white shadow-sm p-6">
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
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 bg-white text-gray-900 placeholder-gray-500/60 min-h-[44px]"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={MIN_PASSWORD_LENGTH}
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 bg-white text-gray-900 placeholder-gray-500/60 min-h-[44px]"
              placeholder="At least 6 characters"
              disabled={isLoading}
              aria-describedby="new-password-hint"
            />
            <p id="new-password-hint" className="mt-1 text-xs text-gray-500">
              At least {MIN_PASSWORD_LENGTH} characters
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={MIN_PASSWORD_LENGTH}
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 bg-white text-gray-900 placeholder-gray-500/60 min-h-[44px]"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 focus:ring-offset-2"
            aria-busy={isLoading}
          >
            {isLoading ? 'Updating...' : 'Change password'}
          </button>
        </form>
      </div>
    </div>
  );
}
