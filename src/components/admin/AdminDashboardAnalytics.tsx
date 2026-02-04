'use client';

import Link from 'next/link';

/** Course with enrollment count for analytics */
export interface CourseEnrollmentRow {
  id: string;
  title: string;
  slug: string;
  enrollments: number;
  published: boolean;
}

/** Recent enrollment for activity list */
export interface RecentEnrollmentRow {
  id: string;
  user_name: string | null;
  course_title: string;
  enrolled_at: string;
}

/** Recent user signup for activity list */
export interface RecentUserRow {
  id: string;
  full_name: string | null;
  created_at: string;
}

interface AdminDashboardAnalyticsProps {
  enrollmentsByCourse: CourseEnrollmentRow[];
  recentEnrollments: RecentEnrollmentRow[];
  recentUsers: RecentUserRow[];
}

/**
 * Format ISO date string for display.
 */
function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString();
}

/**
 * Analytics section: enrollments by course, recent enrollments, recent users.
 */
export default function AdminDashboardAnalytics({
  enrollmentsByCourse,
  recentEnrollments,
  recentUsers,
}: AdminDashboardAnalyticsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Enrollments by course */}
      <section
        className="rounded-xl border border-bgDark-2/20 bg-white p-6 shadow-sm"
        aria-labelledby="enrollments-by-course"
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            id="enrollments-by-course"
            className="text-lg font-semibold text-gray-900"
          >
            Enrollments by Course
          </h2>
          <Link
            href="/admin/enrollments"
            className="text-sm font-medium text-bgDark-2 hover:text-bgDark-1 transition-colors"
          >
            View all →
          </Link>
        </div>
        {enrollmentsByCourse.length === 0 ? (
          <p className="text-gray-500 text-sm py-4">No enrollments yet.</p>
        ) : (
          <ul className="space-y-3" role="list">
            {enrollmentsByCourse.map((row) => (
              <li
                key={row.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <Link
                  href={`/admin/courses/${row.id}/edit`}
                  className="text-gray-800 hover:text-bgDark-2 font-medium truncate flex-1 min-w-0 mr-3"
                >
                  {row.title}
                  {!row.published && (
                    <span className="ml-2 text-xs text-amber-600 font-normal">
                      (draft)
                    </span>
                  )}
                </Link>
                <span className="text-bgDark-1 font-semibold tabular-nums shrink-0">
                  {row.enrollments}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Recent activity: enrollments + users */}
      <section
        className="rounded-xl border border-bgDark-2/20 bg-white p-6 shadow-sm"
        aria-labelledby="recent-activity"
      >
        <h2
          id="recent-activity"
          className="text-lg font-semibold text-gray-900 mb-4"
        >
          Recent Activity
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Recent Enrollments
            </h3>
            {recentEnrollments.length === 0 ? (
              <p className="text-gray-500 text-sm py-2">None yet.</p>
            ) : (
              <ul className="space-y-2" role="list">
                {recentEnrollments.slice(0, 5).map((e) => (
                  <li key={e.id} className="text-sm">
                    <span className="text-gray-800 font-medium">
                      {e.user_name || 'Unknown user'}
                    </span>
                    {' enrolled in '}
                    <span className="text-gray-800">{e.course_title}</span>
                    <span className="text-gray-500 ml-1">{formatDate(e.enrolled_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">New Users</h3>
            {recentUsers.length === 0 ? (
              <p className="text-gray-500 text-sm py-2">None yet.</p>
            ) : (
              <ul className="space-y-2" role="list">
                {recentUsers.slice(0, 5).map((u) => (
                  <li key={u.id} className="text-sm">
                    <span className="text-gray-800 font-medium">
                      {u.full_name || 'Unknown'}
                    </span>
                    <span className="text-gray-500 ml-1">{formatDate(u.created_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
