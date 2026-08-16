import { IconArrowLeft } from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import MonitorHeader from '@/features/monitors/components/monitor-header';
import StatCard from '@/features/monitors/components/stat-card';
import UpdateMonitorForm from '@/features/monitors/components/update-monitor-form';
import { getMonitor } from '@/features/monitors/dal';
import { getCurrentUserOrRedirect } from '@/lib/auth/session';

export default async function MonitorPage({ params }: PageProps<'/monitors/[monitorId]'>) {
  const { monitorId } = await params;
  const user = await getCurrentUserOrRedirect({ callbackURL: `/monitors/${monitorId}` as Route });

  const monitor = await getMonitor(monitorId, user.id);

  if (!monitor) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          nativeButton={false}
          render={<Link href="/monitors" />}
        >
          <IconArrowLeft />
          Monitors
        </Button>
      </div>

      <MonitorHeader monitor={monitor} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Monitor performance and recent availability.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Uptime" value="—" />
            <StatCard label="Response time" value="—" />
            <StatCard label="Last check" value="—" />
          </div>

          <div className="border-border rounded-xl border p-6">
            <h3 className="font-medium">Incident history</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Incidents and check history will appear here once monitoring is running.
            </p>
          </div>
        </section>

        <aside>
          <UpdateMonitorForm monitor={monitor} />
        </aside>
      </div>
    </div>
  );
}
