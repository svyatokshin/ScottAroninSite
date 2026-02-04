import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

/**
 * Public courses list. Shows published courses (metadata only).
 */
export default async function CoursesListPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('id, title, slug, description')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 mb-2 text-center">
          Courses
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Mind-body wellness courses. Sign up to access lesson content.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses?.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="group rounded-2xl border border-bgDark-2/20 bg-white p-6 shadow-sm hover:shadow-lg hover:border-bgDark-2/30 transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-bgDark-2 transition-colors">
                {course.title}
              </h2>
              {course.description && (
                <p className="mt-2 text-gray-600 line-clamp-3">{course.description}</p>
              )}
            </Link>
          ))}
        </div>

        {(!courses || courses.length === 0) && (
          <div className="text-center py-16 text-gray-500">
            No courses available yet. Check back soon.
          </div>
        )}
      </div>
    </div>
  );
}
