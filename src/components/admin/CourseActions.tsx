'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deleteCourse } from '@/app/actions/courses';

interface CourseActionsProps {
  courseId: string;
}

/**
 * Actions for a course (edit, manage lessons, delete).
 */
export default function CourseActions({ courseId }: CourseActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Delete this course and all its modules/lessons?')) return;
    setIsDeleting(true);
    const result = await deleteCourse(courseId);
    if (result.error) {
      alert(result.error);
    } else {
      router.refresh();
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin/courses/${courseId}/edit`}
        className="text-sm text-bgDark-2 hover:underline"
      >
        Edit
      </Link>
      <Link
        href={`/admin/courses/${courseId}/lessons`}
        className="text-sm text-bgDark-2 hover:underline"
      >
        Lessons
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-sm text-red-600 hover:underline disabled:opacity-50"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
