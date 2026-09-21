import { Suspense } from 'react';

import ApplicationHeader from '@/features/application/components/application-header';
import DashboardSidebar from '@/features/sidebar';
import { requireAuthOrRedirect } from '@/lib/auth/session';

async function AuthenticatedApplication({ children }: { children: React.ReactNode }) {
  await requireAuthOrRedirect({ callbackURL: '/dashboard' });

  return <main className="mx-auto w-full max-w-6xl space-y-8 p-3 lg:p-6">{children}</main>;
}

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh w-full flex-col lg:flex-row">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <ApplicationHeader />

        <Suspense>
          <AuthenticatedApplication>{children}</AuthenticatedApplication>
        </Suspense>
      </div>
    </div>
  );
}
