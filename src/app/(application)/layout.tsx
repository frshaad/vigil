import DashboardSidebar from '@/features/dashboard/components/sidebar';
import { requireAuthOrRedirect } from '@/lib/auth/session';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuthOrRedirect({ callbackURL: '/dashboard' });

  return (
    <div className="flex min-h-svh w-full flex-col lg:flex-row">
      <DashboardSidebar />
      <main className="w-full p-3 lg:p-6">{children}</main>
    </div>
  );
}
