import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MonitorCheckSummary } from '@/features/monitoring/history/get-monitor-check-history';

import { formatHttpStatus, formatResponseTime } from '../utils';
import MonitorCheckStatus from './monitor-check-status';

interface MonitorRecentChecksProps {
  checks: MonitorCheckSummary[];
}

export default function MonitorRecentChecks({ checks }: MonitorRecentChecksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent checks</CardTitle>
      </CardHeader>

      <CardContent>
        {checks.length === 0 ? (
          <p className="text-muted-foreground text-sm">No checks have been recorded yet.</p>
        ) : (
          <div className="divide-y">
            {checks.map((check) => (
              <div
                key={check.id}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 py-3 text-sm"
              >
                <div className="min-w-0">
                  <MonitorCheckStatus status={check.status} />

                  {check.error && (
                    <p className="text-muted-foreground mt-1 truncate text-xs">{check.error}</p>
                  )}
                </div>

                <span className="text-muted-foreground">{formatHttpStatus(check.statusCode)}</span>

                <span className="text-muted-foreground">
                  {formatResponseTime(check.responseTimeMs)}
                </span>

                <time
                  dateTime={check.checkedAt.toISOString()}
                  className="text-muted-foreground whitespace-nowrap"
                >
                  {check.checkedAt.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
