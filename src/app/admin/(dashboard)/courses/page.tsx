import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import CourseActions from '@/components/admin/CourseActions';

/**
 * Admin course list page.
 */
export default async function AdminCoursesListPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('id, title, slug, description, published, created_at')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-semibold text-gray-900">
          Courses
        </h1>
        <Link
          href="/admin/courses/new"
          className="px-6 py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors min-h-[44px] flex items-center"
        >
          New Course
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-bgDark-2/20 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses?.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/courses/${course.id}/edit`}
                    className="text-bgDark-2 hover:underline font-medium"
                  >
                    {course.title}
                  </Link>
                  <Link
                    href={`/admin/courses/${course.id}/lessons`}
                    className="block text-sm text-gray-500 hover:text-bgDark-2 mt-1"
                  >
                    Manage lessons →
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      course.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {course.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(course.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <CourseActions courseId={course.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!courses || courses.length === 0) && (
          <div className="px-6 py-12 text-center text-gray-500">
            No courses yet.{' '}
            <Link href="/admin/courses/new" className="text-bgDark-2 hover:underline">
              Create one
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
