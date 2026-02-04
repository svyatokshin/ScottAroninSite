import { createClient } from '@/lib/supabase/server';
import AdminDashboardStats, {
  type DashboardStats,
} from '@/components/admin/AdminDashboardStats';
import AdminDashboardAnalytics, {
  type CourseEnrollmentRow,
  type RecentEnrollmentRow,
  type RecentUserRow,
} from '@/components/admin/AdminDashboardAnalytics';

/** Seven days ago in ISO format */
const SEVEN_DAYS_AGO = new Date();
SEVEN_DAYS_AGO.setDate(SEVEN_DAYS_AGO.getDate() - 7);

/**
 * Admin dashboard overview page with course, user, and overall analytics.
 */
export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: usersTotal },
    { count: usersRecentCount },
    { data: recentUsersData },
    { data: coursesData },
    { count: modulesCount },
    { count: lessonsCount },
    { data: blogData },
    { count: enrollmentsCount },
    { data: enrollmentsData },
    { data: recentEnrollmentsData },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .neq('role', 'admin'),
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .neq('role', 'admin')
      .gte('created_at', SEVEN_DAYS_AGO.toISOString()),
    supabase
      .from('profiles')
      .select('id, full_name, created_at, role')
      .neq('role', 'admin')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase.from('courses').select('id, title, slug, published'),
    supabase.from('modules').select('*', { count: 'exact', head: true }),
    supabase.from('lessons').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id, published'),
    supabase.from('course_enrollments').select('*', { count: 'exact', head: true }),
    supabase.from('course_enrollments').select('course_id'),
    supabase
      .from('course_enrollments')
      .select('id, enrolled_at, courses(title), profiles(full_name)')
      .order('enrolled_at', { ascending: false })
      .limit(10),
  ]);

  const coursesPublished = coursesData?.filter((c) => c.published).length ?? 0;
  const coursesTotal = coursesData?.length ?? 0;
  const blogPublished = blogData?.filter((b) => b.published).length ?? 0;
  const blogTotal = blogData?.length ?? 0;

  const stats: DashboardStats = {
    usersTotal: usersTotal ?? 0,
    usersRecent: usersRecentCount ?? 0,
    coursesTotal,
    coursesPublished,
    modulesTotal: modulesCount ?? 0,
    lessonsTotal: lessonsCount ?? 0,
    blogTotal,
    blogPublished,
    enrollmentsTotal: enrollmentsCount ?? 0,
  };

  const enrollmentsByCourse: CourseEnrollmentRow[] = (coursesData ?? []).map(
    (course) => {
      const enrollments =
        enrollmentsData?.filter((e) => e.course_id === course.id).length ?? 0;
      return {
        id: course.id,
        title: course.title,
        slug: course.slug,
        enrollments,
        published: course.published ?? false,
      };
    }
  ).sort((a, b) => b.enrollments - a.enrollments);

  type EnrollmentRow = {
    id: string;
    enrolled_at: string;
    courses: { title: string }[] | { title: string } | null;
    profiles: { full_name: string | null }[] | { full_name: string | null } | null;
  };
  const getTitle = (c: EnrollmentRow['courses']) =>
    Array.isArray(c) ? c[0]?.title : c?.title;
  const getName = (p: EnrollmentRow['profiles']) =>
    Array.isArray(p) ? p[0]?.full_name : p?.full_name;
  const recentEnrollments: RecentEnrollmentRow[] = (
    (recentEnrollmentsData ?? []) as EnrollmentRow[]
  ).map((e) => ({
    id: e.id,
    user_name: getName(e.profiles) ?? null,
    course_title: getTitle(e.courses) ?? 'Unknown',
    enrolled_at: e.enrolled_at,
  }));

  const recentUsers: RecentUserRow[] = (recentUsersData ?? []).map((u) => ({
    id: u.id,
    full_name: u.full_name ?? null,
    created_at: u.created_at,
  }));

  return (
    <div>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
        Dashboard
      </h1>

      <section aria-labelledby="overview-stats">
        <h2 id="overview-stats" className="sr-only">
          Overview statistics
        </h2>
        <AdminDashboardStats stats={stats} />
      </section>

      <AdminDashboardAnalytics
        enrollmentsByCourse={enrollmentsByCourse}
        recentEnrollments={recentEnrollments}
        recentUsers={recentUsers}
      />
    </div>
  );
}
