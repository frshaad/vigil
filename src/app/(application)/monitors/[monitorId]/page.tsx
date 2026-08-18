import type { Route } from 'next';
import { notFound } from 'next/navigation';

import MonitorActivityCard from '@/features/monitors/components/monitor-activity-card';
import MonitorBreadcrumbs from '@/features/monitors/components/monitor-breadcrumbs';
import MonitorDetailsCard from '@/features/monitors/components/monitor-details-card';
import MonitorEndpointCard from '@/features/monitors/components/monitor-endpoint-card';
import MonitorHeader from '@/features/monitors/components/monitor-header';
import MonitorOverview from '@/features/monitors/components/monitor-overview';
import UpdateMonitorForm from '@/features/monitors/components/update-monitor-form';
import { getMonitor } from '@/features/monitors/dal';
import { getCurrentUserOrRedirect } from '@/lib/auth/session';

export default async function MonitorPage({ params }: PageProps<'/monitors/[monitorId]'>) {
  const { monitorId } = await params;

  const user = await getCurrentUserOrRedirect({
    callbackURL: `/monitors/${monitorId}` as Route,
  });

  const monitor = await getMonitor(monitorId, user.id);

  if (!monitor) {
    notFound();
  }

  return (
    <>
      <MonitorBreadcrumbs />
      <MonitorHeader monitor={monitor} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-8">
          <MonitorOverview monitor={monitor} />

          <MonitorEndpointCard monitor={monitor} />

          <MonitorActivityCard incidents={monitor.incidents} />

          <MonitorDetailsCard monitor={monitor} />
        </main>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <UpdateMonitorForm monitor={monitor} />
        </aside>
      </div>
    </>
  );
}
