import { IconActivity, IconClock, IconCircleCheck, IconCircleX } from '@tabler/icons-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { MonitorDetails } from '../dal';
import {
  formatRelativeDate,
  formatResponseTime,
  getHttpStatusLabel,
  getMonitorStatusLabel,
} from '../utils';

type MonitorOverviewProps = {
  monitor: MonitorDetails;
};

export default function MonitorOverview({ monitor }: MonitorOverviewProps) {
  const statusLabel = getMonitorStatusLabel({
    isActive: monitor.isActive,
    lastStatus: monitor.lastStatus,
  });

  let statusIcon: React.ReactNode;

  if (monitor.isActive && monitor.lastStatus === 'UP') {
    statusIcon = <IconCircleCheck className="size-5 text-emerald-600 dark:text-emerald-400" />;
  } else if (monitor.isActive && monitor.lastStatus === 'DOWN') {
    statusIcon = <IconCircleX className="text-destructive size-5" />;
  } else {
    <IconActivity className="text-muted-foreground size-5" />;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Overview</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Current health and performance of your monitor.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Status</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              {statusIcon}
              <span className="text-base font-semibold">{statusLabel}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Response time
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-xl font-semibold">
              {formatResponseTime(monitor.lastResponseTimeMs)}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">Latest check</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">HTTP status</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold">{monitor.lastStatusCode ?? '—'}</span>

              {monitor.lastStatusCode !== null && (
                <span className="text-muted-foreground text-xs">
                  {getHttpStatusLabel(monitor.lastStatusCode)}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Last check</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <IconClock className="text-muted-foreground size-4" />
              <span className="text-base font-semibold">
                {monitor.lastCheckedAt ? formatRelativeDate(monitor.lastCheckedAt) : 'Never'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
