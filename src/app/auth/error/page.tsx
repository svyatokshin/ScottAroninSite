'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

/**
 * Auth error page. Displays auth-related errors (invalid link, expired token, etc.).
 */
function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') ?? 'An error occurred';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bgLight-4 via-bgLight-3 to-bgLight-2 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-bgDark-2/20 bg-white/90 backdrop-blur-sm shadow-xl p-8">
          <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-2 text-center">
            Authentication error
          </h1>
          <div
            className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 mb-6"
            role="alert"
          >
            {decodeURIComponent(error)}
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/auth/forgot-password"
              className="text-center py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors"
            >
              Forgot password
            </Link>
            <Link href="/login" className="text-center text-bgDark-2 hover:underline">
              Back to sign in
            </Link>
            <Link href="/" className="text-center text-bgDark-2 hover:underline text-sm">
              Back to site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bgLight-4 via-bgLight-3 to-bgLight-2">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
