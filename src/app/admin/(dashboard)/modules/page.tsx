import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import CreateModuleForm from '@/components/admin/CreateModuleForm';

/**
 * Modules admin page. Create modules first, then add lessons from each module.
 */
export default async function AdminModulesPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from('courses')
    .select('id, title, slug')
    .order('title', { ascending: true });

  const { data: modules } = await supabase
    .from('modules')
    .select('id, title, sort_order, course_id, lessons(id)')
    .order('sort_order', { ascending: true });

  const courseMap = new Map((courses ?? []).map((c) => [c.id, c]));
  const modulesWithCourse = (modules ?? []).map((m) => ({
    ...m,
    course: courseMap.get(m.course_id) ?? null,
    lessonCount: Array.isArray(m.lessons) ? m.lessons.length : 0,
  }));

  return (
    <div>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-2">
        Modules
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        Create modules first, then add lessons to each module.
      </p>

      <div className="mb-10">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Create Module</h2>
        <CreateModuleForm courses={courses ?? []} />
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">All Modules</h2>
        <div className="bg-white rounded-xl border border-bgDark-2/20 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Lessons
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {modulesWithCourse.map((mod) => (
                <tr key={mod.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {mod.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {mod.course?.title ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {mod.lessonCount} lesson{mod.lessonCount !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {mod.course?.id && (
                      <Link
                        href={`/admin/courses/${mod.course.id}/lessons`}
                        className="text-sm text-bgDark-2 hover:underline"
                      >
                        Add lessons
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {modulesWithCourse.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-500">
              No modules yet. Create one above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
