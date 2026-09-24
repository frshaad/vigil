import { Suspense } from 'react';

import { getUnreadInAppNotificationCount } from '@/features/notifications/dal';
import DashboardSidebar from '@/features/sidebar';
import { requireAuthOrRedirect } from '@/lib/auth/session';

async function AuthenticatedApplication({ children }: { children: React.ReactNode }) {
  const { user } = await requireAuthOrRedirect({ callbackURL: '/dashboard' });

  const unreadNotificationCount = await getUnreadInAppNotificationCount(user.id);

  return (
    <div className="flex min-h-svh w-full flex-col lg:flex-row">
      <DashboardSidebar
        unreadNotificationCount={unreadNotificationCount}
        user={{
          name: user.name,
          email: user.email,
          image: user.image,
        }}
      />

      <div className="bg-background relative min-w-0 flex-1">
        {/* Shared dashboard atmosphere */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black_0%,black_45%,transparent_92%)] bg-size-[40px_40px] opacity-[0.10] dark:opacity-[0.07]" />

          {/* Main top glow */}
          <div className="bg-primary/5 dark:bg-primary/11 absolute inset-x-[-15%] -top-40 h-136 mask-[radial-gradient(ellipse_at_top,black_0%,transparent_68%)]" />

          {/* Secondary ambient glow */}
          <div className="bg-primary/4 dark:bg-primary/8 absolute top-112 -right-48 h-120 w-xl mask-[radial-gradient(circle_at_center,black_0%,transparent_68%)]" />

          {/* Very subtle top accent */}
          <div className="via-primary/35 dark:via-primary/50 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />
        </div>

        <main className="relative z-10 mx-auto w-full max-w-6xl space-y-8 p-3 lg:p-6">
          {children}
        </main>
      </div>
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
