'use client';

import { useEffect } from 'react';

/**
 * Error boundary for the root segment. Catches React errors and shows fallback.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen py-24 flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        An error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="px-6 py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors min-h-[44px]"
      >
        Try again
      </button>
    </div>
  );
}
