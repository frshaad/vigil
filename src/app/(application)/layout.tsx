import { Suspense } from 'react';

import DashboardSidebar from '@/features/dashboard/components/sidebar';
import { requireAuthOrRedirect } from '@/lib/auth/session';

async function AuthenticatedDashboard({ children }: { children: React.ReactNode }) {
  await requireAuthOrRedirect({ callbackURL: '/dashboard' });

  return <main className="mx-auto w-full max-w-6xl space-y-8 p-3 lg:p-6">{children}</main>;
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh w-full flex-col lg:flex-row">
      <DashboardSidebar />

      <Suspense>
        <AuthenticatedDashboard>{children}</AuthenticatedDashboard>
      </Suspense>
    </div>
  );
}
