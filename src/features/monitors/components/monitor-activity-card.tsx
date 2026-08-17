import { IconAlertCircle, IconCheck, IconClock } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { MonitorDetails } from '../dal';
import { formatRelativeDate, formatDuration } from '../utils';

type MonitorActivityCardProps = {
  incidents: MonitorDetails['incidents'];
};

export default function MonitorActivityCard({ incidents }: MonitorActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Incident history</CardTitle>
      </CardHeader>

      <CardContent>
        {incidents.length === 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed px-6 py-8 text-center">
            <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <IconCheck className="size-4" />
            </div>

            <p className="text-sm font-medium">No incidents recorded</p>

            <p className="text-muted-foreground mt-1 text-sm">
              Your monitor hasn't reported any incidents yet.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {incidents.map((incident) => (
              <div key={incident.id} className="flex gap-4 rounded-lg p-3">
                <div
                  className={cn(
                    'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
                    incident.status === 'OPEN'
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  )}
                >
                  {incident.status === 'OPEN' ? (
                    <IconAlertCircle className="size-4" />
                  ) : (
                    <IconCheck className="size-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{incident.error ?? 'Monitor incident'}</p>

                    <Badge variant={incident.status === 'OPEN' ? 'destructive' : 'secondary'}>
                      {incident.status === 'OPEN' ? 'Open' : 'Resolved'}
                    </Badge>
                  </div>

                  <div className="text-muted-foreground mt-1 flex flex-wrap gap-x-3 text-xs">
                    <span>{formatRelativeDate(incident.startedAt)}</span>

                    {incident.statusCode !== null && <span>HTTP {incident.statusCode}</span>}

                    {incident.resolvedAt && (
                      <span className="inline-flex items-center gap-1">
                        <IconClock className="size-3" />
                        {formatDuration(incident.startedAt, incident.resolvedAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
