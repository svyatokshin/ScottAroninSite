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
    { data: lessonProgressData },
    { data: lessonsWithModulesData },
    { data: quizAttemptsData },
    { count: appointmentsUpcoming },
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
    supabase.from('course_enrollments').select('user_id, course_id'),
    supabase
      .from('course_enrollments')
      .select('id, enrolled_at, courses(title), profiles(full_name)')
      .order('enrolled_at', { ascending: false })
      .limit(10),
    supabase.from('lesson_progress').select('user_id, lesson_id'),
    supabase
      .from('lessons')
      .select('id, module_id, modules(course_id)'),
    supabase.from('quiz_attempts').select('id, is_correct'),
    supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'confirmed')
      .gte('start_time', new Date().toISOString()),
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
    appointmentsUpcoming: appointmentsUpcoming ?? 0,
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

  // Build lesson -> course map
  const lessonToCourse = new Map<string, string>();
  for (const l of lessonsWithModulesData ?? []) {
    const mod = l.modules as { course_id: string } | { course_id: string }[] | null;
    const courseId = Array.isArray(mod) ? mod[0]?.course_id : mod?.course_id;
    if (courseId) lessonToCourse.set(l.id, courseId);
  }

  // Total lessons per course
  const totalLessonsByCourse = new Map<string, number>();
  for (const [, courseId] of Array.from(lessonToCourse)) {
    totalLessonsByCourse.set(
      courseId,
      (totalLessonsByCourse.get(courseId) ?? 0) + 1
    );
  }

  // Completed count per (user, course)
  const completedByUserCourse = new Map<string, number>();
  for (const p of lessonProgressData ?? []) {
    const courseId = lessonToCourse.get(p.lesson_id);
    if (!courseId) continue;
    const key = `${p.user_id}-${courseId}`;
    completedByUserCourse.set(key, (completedByUserCourse.get(key) ?? 0) + 1);
  }

  // For each course: enrollments, how many completed all lessons
  const courseCompletion = (coursesData ?? []).map((course) => {
    const enrollments = enrollmentsData?.filter((e) => e.course_id === course.id) ?? [];
    const totalLessons = totalLessonsByCourse.get(course.id) ?? 0;
    let completed = 0;
    for (const e of enrollments) {
      const key = `${e.user_id}-${course.id}`;
      const progressCount = completedByUserCourse.get(key) ?? 0;
      if (totalLessons > 0 && progressCount >= totalLessons) completed++;
    }
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      enrollments: enrollments.length,
      completed,
      totalLessons,
      completionRate:
        enrollments.length > 0 && totalLessons > 0
          ? Math.round((completed / enrollments.length) * 100)
          : 0,
    };
  });

  const quizAttempts = quizAttemptsData ?? [];
  const quizCorrect = quizAttempts.filter((a) => a.is_correct).length;
  const quizTotal = quizAttempts.length;
  const quizSuccessRate =
    quizTotal > 0 ? Math.round((quizCorrect / quizTotal) * 100) : 0;

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
        courseCompletion={courseCompletion}
        quizStats={{ total: quizTotal, correct: quizCorrect, successRate: quizSuccessRate }}
      />
    </div>
  );
}
