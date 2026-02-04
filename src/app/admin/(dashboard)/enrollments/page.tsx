import { createClient } from '@/lib/supabase/server';
import EnrollmentsManager from '@/components/admin/EnrollmentsManager';

/**
 * Admin enrollments page. Add users to courses manually.
 */
export default async function EnrollmentsPage() {
  const supabase = await createClient();

  const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
    supabase.from('profiles').select('id, full_name').eq('role', 'user').order('full_name'),
    supabase.from('courses').select('id, title').eq('published', true).order('title'),
    supabase.from('course_enrollments').select('user_id, course_id'),
  ]);

  const users = usersRes.data ?? [];
  const courses = coursesRes.data ?? [];
  const enrollmentSet = new Set(
    (enrollmentsRes.data ?? []).map((e) => `${e.user_id}-${e.course_id}`)
  );

  return (
    <div>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
        Course Enrollments
      </h1>
      <EnrollmentsManager
        users={users}
        courses={courses}
        enrollmentSet={Array.from(enrollmentSet)}
      />
    </div>
  );
}
