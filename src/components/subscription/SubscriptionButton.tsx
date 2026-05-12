'use client';

import { useState } from 'react';

interface SubscriptionButtonProps {
  hasActiveSubscription: boolean;
}

export default function SubscriptionButton({
  hasActiveSubscription,
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endpoint = hasActiveSubscription
    ? '/api/stripe/portal'
    : '/api/stripe/checkout';

  const buttonLabel = hasActiveSubscription
    ? 'Manage subscription'
    : 'Upgrade to premium';

  const loadingLabel = hasActiveSubscription
    ? 'Opening portal...'
    : 'Redirecting...';

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, { method: 'POST' });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? 'Something went wrong');
      }

      window.location.href = data.url;
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Could not open Stripe right now.'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-lg bg-zen-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-zen-blue-dark disabled:cursor-not-allowed disabled:opacity-60 min-h-[44px]"
      >
        {isLoading ? loadingLabel : buttonLabel}
      </button>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
