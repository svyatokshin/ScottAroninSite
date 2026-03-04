'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { enrollSelf } from '@/app/actions/enrollments';

interface EnrollButtonProps {
  courseId: string;
}

/**
 * Enroll button for self-enrollable courses. Calls enrollSelf and refreshes.
 */
export default function EnrollButton({ courseId }: EnrollButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnroll = async () => {
    setIsLoading(true);
    setError(null);
    const result = await enrollSelf(courseId);
    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }
    router.refresh();
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleEnroll}
        disabled={isLoading}
        className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors disabled:opacity-50 min-h-[44px]"
        aria-label="Enroll in this course"
      >
        {isLoading ? 'Enrolling...' : 'Enroll in course'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
