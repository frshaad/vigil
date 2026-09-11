import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { getDashboardRecentActivity } from '../dal';

type DashboardActivityItem = Awaited<ReturnType<typeof getDashboardRecentActivity>>[number];

interface DashboardActivityProps {
  activity: DashboardActivityItem[];
}

export default function DashboardActivity({ activity }: DashboardActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>

      <CardContent>
        {activity.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-sm">No recent activity.</p>
        ) : (
          <div className="divide-y">
            {activity.map((item) => {
              const recovered = item.status === 'RESOLVED';

              return (
                <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  {recovered ? (
                    <IconCircleCheck className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <IconCircleX className="text-destructive size-4 shrink-0" />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">
                      {item.monitor.name} {recovered ? 'recovered' : 'went down'}
                    </p>

                    {item.statusCode && (
                      <p className="text-muted-foreground mt-0.5 text-xs">HTTP {item.statusCode}</p>
                    )}
                  </div>

                  <time
                    dateTime={(item.resolvedAt ?? item.startedAt).toISOString()}
                    className="text-muted-foreground shrink-0 text-xs"
                  >
                    {(item.resolvedAt ?? item.startedAt).toLocaleString([], {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </time>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
