import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { MonitorDetails } from '../dal';
import { formatDate, formatInterval } from '../utils';

type MonitorDetailsCardProps = {
  monitor: MonitorDetails;
};

export default function MonitorDetailsCard({ monitor }: MonitorDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Monitor details</CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground text-sm">Created</dt>
            <dd className="mt-1 text-sm font-medium">{formatDate(monitor.createdAt)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground text-sm">Last updated</dt>
            <dd className="mt-1 text-sm font-medium">{formatDate(monitor.updatedAt)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground text-sm">Monitor ID</dt>
            <dd className="mt-1 truncate font-mono text-sm">{monitor.id}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground text-sm">Check interval</dt>
            <dd className="mt-1 text-sm font-medium">{formatInterval(monitor.intervalSeconds)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
