import { IconAlertTriangle } from '@tabler/icons-react';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { getDashboardIncidents } from '../dal';

type DashboardIncident = Awaited<ReturnType<typeof getDashboardIncidents>>[number];

interface DashboardIncidentsProps {
  incidents: DashboardIncident[];
}

export default function DashboardIncidents({ incidents }: DashboardIncidentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Open incidents</CardTitle>
      </CardHeader>

      <CardContent>
        {incidents.length === 0 ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <IconAlertTriangle className="size-5" />
            </div>

            <p className="mt-3 text-sm font-medium">All systems operational</p>

            <p className="text-muted-foreground mt-1 text-xs">No open incidents right now.</p>
          </div>
        ) : (
          <div className="divide-y">
            {incidents.map((incident) => (
              <Link
                key={incident.id}
                href={`/dashboard/monitors/${incident.monitor.id}`}
                className="block py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{incident.monitor.name}</p>

                    <p className="text-muted-foreground mt-1 text-xs">
                      {incident.statusCode
                        ? `HTTP ${incident.statusCode}`
                        : (incident.error ?? 'Check failed')}
                    </p>
                  </div>

                  <span className="text-destructive shrink-0 text-xs font-medium">Down</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
