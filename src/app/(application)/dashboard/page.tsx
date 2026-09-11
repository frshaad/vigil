import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import DashboardActivity from '@/features/dashboard/components/dashboard-activity';
import DashboardIncidents from '@/features/dashboard/components/dashboard-incidents';
import DashboardMetrics from '@/features/dashboard/components/dashboard-metrics';
import DashboardMonitors from '@/features/dashboard/components/dashboard-monitors';
import {
  getDashboardIncidents,
  getDashboardMetrics,
  getDashboardMonitors,
  getDashboardRecentActivity,
} from '@/features/dashboard/dal';
import { sortDashboardMonitors } from '@/features/dashboard/utils';
import { getCurrentUserOrRedirect } from '@/lib/auth/session';

export default async function DashboardPage() {
  const user = await getCurrentUserOrRedirect({
    callbackURL: '/dashboard',
  });

  const [metrics, monitors, incidents, activity] = await Promise.all([
    getDashboardMetrics(user.id),
    getDashboardMonitors(user.id),
    getDashboardIncidents(user.id),
    getDashboardRecentActivity(user.id),
  ]);

  const sortedMonitors = sortDashboardMonitors(monitors);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>

          <p className="text-muted-foreground mt-1 text-sm">
            Keep an eye on your websites and APIs.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={
            <Link href="/dashboard/monitors/new">
              <IconPlus />
              Add monitor
            </Link>
          }
        />
      </header>

      <DashboardMetrics metrics={metrics} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <DashboardMonitors monitors={sortedMonitors} />

        <DashboardIncidents incidents={incidents} />
      </div>

      <DashboardActivity activity={activity} />
    </div>
  );
}
