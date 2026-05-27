'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createModule } from '@/app/actions/courses';

interface Course {
  id: string;
  title: string;
  slug: string;
}

interface CreateModuleFormProps {
  courses: Course[];
}

/**
 * Form to create a new module. User picks a course, then enters module title.
 */
export default function CreateModuleForm({ courses }: CreateModuleFormProps) {
  const router = useRouter();
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId || !title.trim()) return;
    setIsSubmitting(true);
    const result = await createModule(courseId, {
      title: title.trim(),
      sort_order: 0,
    });
    if (result.error) {
      alert(result.error);
    } else {
      setTitle('');
      router.refresh();
    }
    setIsSubmitting(false);
  };

  if (courses.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
        Create a <Link href="/admin/courses/new" className="underline font-medium">course</Link> first, then add modules.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
      <div className="min-w-[200px]">
        <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
          Course
        </label>
        <select
          id="course"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full px-4 py-2 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 min-h-[44px]"
          disabled={isSubmitting}
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="moduleTitle" className="block text-sm font-medium text-gray-700 mb-1">
          Module title
        </label>
        <input
          id="moduleTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Week 1: Introduction"
          className="w-full px-4 py-2 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 min-h-[44px]"
          disabled={isSubmitting}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="px-6 py-2 rounded-lg font-medium text-white bg-zen-blue hover:bg-zen-blue-dark disabled:opacity-50 min-h-[44px]"
      >
        {isSubmitting ? 'Creating...' : 'Create Module'}
      </button>
    </form>
  );
}
