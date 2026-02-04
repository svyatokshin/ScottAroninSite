'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from '@/app/actions/onboarding';

interface OnboardingFlowProps {
  userName: string;
  enrolledCourses: { title: string; slug: string }[];
}

/**
 * Multi-step onboarding wizard for new users.
 */
export default function OnboardingFlow({
  userName,
  enrolledCourses,
}: OnboardingFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  const handleComplete = async () => {
    setIsSubmitting(true);
    const result = await completeOnboarding();
    if (result.error) {
      alert(result.error);
      setIsSubmitting(false);
      return;
    }
    router.push('/dashboard');
    router.refresh();
    setIsSubmitting(false);
  };

  return (
    <div className="rounded-2xl border border-bgDark-2/20 bg-white shadow-xl p-8">
      {/* Progress */}
      <div className="flex gap-2 mb-8" aria-label="Onboarding progress">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i + 1 <= step ? 'bg-[#0D47A1]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h1 className="text-2xl font-serif font-semibold text-gray-900">
            Welcome, {userName}!
          </h1>
          <p className="text-gray-600">
            You&apos;re joining Scott Aronin&apos;s mind-body wellness platform. We&apos;re glad to have you.
          </p>
          <p className="text-gray-600">
            In the next few steps, we&apos;ll show you around so you can make the most of your courses.
          </p>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-bgDark-2/60"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h1 className="text-2xl font-serif font-semibold text-gray-900">
            Your learning journey
          </h1>
          <p className="text-gray-600">
            Courses are organized into modules and lessons. Each lesson may include text, audio, or video content.
          </p>
          {enrolledCourses.length > 0 ? (
            <div className="rounded-lg border border-bgDark-2/20 bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Your enrolled courses:</p>
              <ul className="space-y-1">
                {enrolledCourses.map((c) => (
                  <li key={c.slug} className="text-gray-600">
                    • {c.title}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">
              Once you&apos;re enrolled in a course, you&apos;ll see it on your dashboard and can access all lesson content.
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 py-3 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 min-h-[44px]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors min-h-[44px]"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h1 className="text-2xl font-serif font-semibold text-gray-900">
            You&apos;re all set
          </h1>
          <p className="text-gray-600">
            Your dashboard is where you&apos;ll find your courses, track progress, and continue learning.
          </p>
          <button
            type="button"
            onClick={handleComplete}
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] disabled:opacity-50 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-bgDark-2/60"
          >
            {isSubmitting ? 'Setting up...' : 'Go to Dashboard'}
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-gray-500">
        <button
          type="button"
          onClick={handleComplete}
          disabled={isSubmitting}
          className="text-bgDark-2 hover:underline disabled:opacity-50"
        >
          Skip to Dashboard
        </button>
      </p>
    </div>
  );
}
