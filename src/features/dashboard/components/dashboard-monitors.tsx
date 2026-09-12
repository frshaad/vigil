import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { DashboardMonitor } from '../dal';
import DashboardMonitorCard from './dashboard-monitor-card';
import DashboardPinnedMonitors from './dashboard-pinned-monitors';

interface DashboardMonitorsProps {
  monitors: DashboardMonitor[];
}

export default function DashboardMonitors({ monitors }: DashboardMonitorsProps) {
  const pinnedMonitors = monitors
    .filter((monitor) => monitor.monitorPreference?.isPinned ?? false)
    .sort((a, b) => (a.monitorPreference?.position ?? 0) - (b.monitorPreference?.position ?? 0));

  const unpinnedMonitors = monitors
    .filter((monitor) => !(monitor.monitorPreference?.isPinned ?? false))
    .sort((a, b) => a.name.localeCompare(b.name));

  const visibleUnpinnedMonitors = unpinnedMonitors.slice(0, Math.max(0, 6 - pinnedMonitors.length));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Monitors</CardTitle>

        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={
            <Link href="/dashboard/monitors">
              View all
              <IconArrowRight />
            </Link>
          }
        />
      </CardHeader>

      <CardContent className="space-y-3">
        {pinnedMonitors.length > 0 && (
          <DashboardPinnedMonitors
            key={pinnedMonitors
              .map((monitor) => {
                const position = monitor.monitorPreference?.position ?? 0;

                return `${monitor.id}:${position}`;
              })
              .join('|')}
            monitors={pinnedMonitors}
          />
        )}

        {visibleUnpinnedMonitors.map((monitor) => (
          <div key={monitor.id} className="flex items-center gap-1">
            <div className="size-8 shrink-0" aria-hidden="true" />

            <div className="min-w-0 flex-1">
              <DashboardMonitorCard monitor={monitor} isPinned={false} />
            </div>
          </div>
        ))}

        {monitors.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm font-medium">No monitors yet</p>

            <p className="text-muted-foreground mt-1 text-sm">
              Add your first monitor to start monitoring.
            </p>

            <Button
              className="mt-4"
              nativeButton={false}
              render={<Link href="/dashboard/monitors/new">Add monitor</Link>}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
