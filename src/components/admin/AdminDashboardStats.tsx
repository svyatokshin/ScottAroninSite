'use client';

import Link from 'next/link';

/** Props for a single stat card */
interface StatCardProps {
  label: string;
  value: number | string;
  subtext?: string;
  href?: string;
  variant?: 'default' | 'highlight';
}

/**
 * Stat card for dashboard metrics. Links to related admin section when href provided.
 */
function StatCard({ label, value, subtext, href, variant = 'default' }: StatCardProps) {
  const baseClasses =
    'rounded-xl border border-bgDark-2/20 bg-white p-6 shadow-sm transition-all min-h-[120px] flex flex-col justify-between';
  const interactiveClasses = href
    ? 'hover:shadow-md hover:border-bgDark-2/30 hover:scale-[1.01]'
    : '';
  const highlightClasses = variant === 'highlight' ? 'ring-2 ring-bgDark-2/30' : '';

  const content = (
    <>
      <h2 className="text-lg font-medium text-gray-900">{label}</h2>
      <p className="text-3xl font-semibold text-bgDark-1 mt-1">{value}</p>
      {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
    </>
  );

  const className = `${baseClasses} ${interactiveClasses} ${highlightClasses}`;

  if (href) {
    return (
      <Link href={href} className={className} aria-label={`View ${label}`}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

/** Dashboard stats summary */
export interface DashboardStats {
  usersTotal: number;
  usersRecent: number;
  coursesTotal: number;
  coursesPublished: number;
  modulesTotal: number;
  lessonsTotal: number;
  blogTotal: number;
  blogPublished: number;
  enrollmentsTotal: number;
  appointmentsUpcoming: number;
}

interface AdminDashboardStatsProps {
  stats: DashboardStats;
}

/**
 * Overview stat cards for admin dashboard (users, courses, content, enrollments).
 */
export default function AdminDashboardStats({ stats }: AdminDashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <StatCard
        label="Total Users"
        value={stats.usersTotal}
        subtext={
          stats.usersRecent > 0 ? `+${stats.usersRecent} in last 7 days` : undefined
        }
        variant="highlight"
      />
      <StatCard
        label="Courses"
        value={`${stats.coursesPublished}/${stats.coursesTotal}`}
        subtext="Published / Total"
        href="/admin/courses"
      />
      <StatCard
        label="Modules"
        value={stats.modulesTotal}
        subtext="Across all courses"
      />
      <StatCard
        label="Lessons"
        value={stats.lessonsTotal}
        subtext="Total content items"
      />
      <StatCard
        label="Blog Posts"
        value={`${stats.blogPublished}/${stats.blogTotal}`}
        subtext="Published / Total"
        href="/admin/blog"
      />
      <StatCard
        label="Enrollments"
        value={stats.enrollmentsTotal}
        subtext="Total course enrollments"
        href="/admin/enrollments"
      />
      <StatCard
        label="Appointments"
        value={stats.appointmentsUpcoming}
        subtext="Upcoming confirmed"
        href="/admin/scheduling"
      />
    </div>
  );
}
