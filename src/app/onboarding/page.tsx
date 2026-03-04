'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from '@/app/actions/onboarding';

const STEPS = [
  {
    title: 'Welcome',
    content: 'Welcome to your learning journey. We’ll help you get started with our mind-body wellness courses.',
  },
  {
    title: 'Getting Started',
    content: 'Your enrolled courses will appear on your dashboard. You can access lessons, track progress, and learn at your own pace.',
  },
  {
    title: 'You’re All Set',
    content: 'Click below to go to your dashboard and begin your first lesson.',
  },
];

/**
 * Onboarding wizard for first-time users. Redirects to dashboard when complete.
 */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const isLastStep = step === STEPS.length - 1;

  const handleNext = async () => {
    if (isLastStep) {
      setIsCompleting(true);
      const result = await completeOnboarding();
      if (result.error) {
        alert(result.error);
        setIsCompleting(false);
        return;
      }
      router.push('/dashboard');
      router.refresh();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-bgLight-4 via-bgLight-3 to-bgLight-2 p-4">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-bgDark-2/20 bg-white/90 backdrop-blur-sm shadow-xl p-8">
          {/* Progress */}
          <div className="flex gap-2 mb-8" aria-label="Progress">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-zen-blue' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-2">
            {STEPS[step].title}
          </h1>
          <p className="text-gray-600 mb-8">{STEPS[step].content}</p>

          <div className="flex gap-3 justify-end">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={isCompleting}
                className="px-6 py-3 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors min-h-[44px]"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={isCompleting}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {isCompleting
                ? 'Loading...'
                : isLastStep
                  ? 'Go to Dashboard'
                  : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
