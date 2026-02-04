/**
 * Root admin layout. Renders children - login page has no chrome,
 * dashboard routes use AdminDashboardLayout from (dashboard) group.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
