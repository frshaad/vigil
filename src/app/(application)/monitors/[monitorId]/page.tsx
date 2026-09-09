import type { Route } from 'next';
import { notFound } from 'next/navigation';

import {
  getMonitorCheckHistory,
  getRecentMonitorChecks,
} from '@/features/monitoring/history/get-monitor-check-history';
import { getMonitorMetrics } from '@/features/monitoring/history/get-monitor-metrics';
import { MetricCard } from '@/features/monitors/components/metric-card';
import MonitorActivityCard from '@/features/monitors/components/monitor-activity-card';
import MonitorBreadcrumbs from '@/features/monitors/components/monitor-breadcrumbs';
import MonitorDetailsCard from '@/features/monitors/components/monitor-details-card';
import MonitorEndpointCard from '@/features/monitors/components/monitor-endpoint-card';
import MonitorHeader from '@/features/monitors/components/monitor-header';
import MonitorRecentChecks from '@/features/monitors/components/monitor-recent-checks';
import MonitorResponseTimeChart from '@/features/monitors/components/monitor-response-time-chart';
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

  const [metrics, history, recentChecks] = await Promise.all([
    getMonitorMetrics(monitor.id),
    getMonitorCheckHistory(monitor.id),
    getRecentMonitorChecks(monitor.id),
  ]);

  const chartData = history.map((check) => ({
    checkedAt: check.checkedAt.toISOString(),
    responseTimeMs: check.responseTimeMs,
  }));

  return (
    <>
      <MonitorBreadcrumbs />
      <MonitorHeader monitor={monitor} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0 space-y-8">
          <section className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Availability"
              value={metrics.availability === null ? '—' : `${metrics.availability.toFixed(2)}%`}
              description="Last 24 hours"
            />

            <MetricCard
              label="Checks"
              value={metrics.totalChecks.toLocaleString()}
              description="Last 24 hours"
            />

            <MetricCard
              label="Avg. response"
              value={
                metrics.averageResponseTimeMs === null ? '—' : `${metrics.averageResponseTimeMs} ms`
              }
              description="Last 24 hours"
            />
          </section>

          <MonitorResponseTimeChart data={chartData} />

          <MonitorRecentChecks checks={recentChecks} />

          <MonitorActivityCard incidents={monitor.incidents} />

          <MonitorEndpointCard monitor={monitor} />

          <MonitorDetailsCard monitor={monitor} />
        </main>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <UpdateMonitorForm monitor={monitor} />
        </aside>
      </div>
    </>
  );
}
