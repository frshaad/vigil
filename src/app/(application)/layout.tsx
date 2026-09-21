import { Suspense } from 'react';

import { getUnreadInAppNotificationCount } from '@/features/notifications/dal';
import DashboardSidebar from '@/features/sidebar';
import { requireAuthOrRedirect } from '@/lib/auth/session';

async function AuthenticatedApplication({ children }: { children: React.ReactNode }) {
  const { user } = await requireAuthOrRedirect({ callbackURL: '/dashboard' });

  const unreadNotificationCount = await getUnreadInAppNotificationCount(user.id);

  return (
    <div className="flex min-h-svh w-full flex-col lg:flex-row">
      <DashboardSidebar unreadNotificationCount={unreadNotificationCount} />

      <main className="mx-auto w-full max-w-6xl space-y-8 p-3 lg:p-6">{children}</main>
    </div>
  );
}

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <AuthenticatedApplication>{children}</AuthenticatedApplication>
    </Suspense>
  );
}
