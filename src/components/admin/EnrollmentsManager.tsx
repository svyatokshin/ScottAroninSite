'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addEnrollment, removeEnrollment } from '@/app/actions/enrollments';

interface EnrollmentsManagerProps {
  users: { id: string; full_name: string | null }[];
  courses: { id: string; title: string }[];
  enrollmentSet: string[];
}

/**
 * UI to add/remove users from courses.
 */
export default function EnrollmentsManager({
  users,
  courses,
  enrollmentSet: initialSet,
}: EnrollmentsManagerProps) {
  const router = useRouter();
  const [enrollmentSet, setEnrollmentSet] = useState(new Set(initialSet));
  const [loading, setLoading] = useState<string | null>(null);

  const key = (userId: string, courseId: string) => `${userId}-${courseId}`;
  const isEnrolled = (userId: string, courseId: string) =>
    enrollmentSet.has(key(userId, courseId));

  const handleToggle = async (userId: string, courseId: string) => {
    const k = key(userId, courseId);
    setLoading(k);
    const enrolled = enrollmentSet.has(k);
    const result = enrolled
      ? await removeEnrollment(userId, courseId)
      : await addEnrollment(userId, courseId);
    if (result.error) {
      alert(result.error);
    } else {
      setEnrollmentSet((prev) => {
        const next = new Set(prev);
        if (enrolled) next.delete(k);
        else next.add(k);
        return next;
      });
      router.refresh();
    }
    setLoading(null);
  };

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-bgDark-2/20 bg-white p-8 text-center text-gray-500">
        No users yet. Users must sign up first.
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-xl border border-bgDark-2/20 bg-white p-8 text-center text-gray-500">
        No published courses yet. Create and publish a course first.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-bgDark-2/20 overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">User</th>
            {courses.map((c) => (
              <th key={c.id} className="px-6 py-3 text-center text-sm font-medium text-gray-500">
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-gray-100">
              <td className="px-6 py-4 text-gray-900">
                {u.full_name || u.id.slice(0, 8)}
              </td>
              {courses.map((c) => {
                const k = key(u.id, c.id);
                const enrolled = enrollmentSet.has(k);
                return (
                  <td key={c.id} className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggle(u.id, c.id)}
                      disabled={loading === k}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        enrolled
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } disabled:opacity-50`}
                    >
                      {loading === k ? '...' : enrolled ? 'Enrolled' : 'Add'}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
