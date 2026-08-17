import { IconExternalLink, IconWorld } from '@tabler/icons-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import type { MonitorDetails } from '../dal';
import { parseMonitorUrl } from '../utils';

type MonitorEndpointCardProps = {
  monitor: MonitorDetails;
};

export default function MonitorEndpointCard({ monitor }: MonitorEndpointCardProps) {
  const url = parseMonitorUrl(monitor.url);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Endpoint</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center">
            <IconWorld className="size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-muted px-2 py-1 font-mono text-xs font-medium">
                {monitor.method}
              </span>

              <a
                href={monitor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex min-w-0 items-center gap-1.5 truncate text-sm hover:underline"
              >
                <span className="truncate">{monitor.url}</span>
                <IconExternalLink className="size-3.5 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        <Separator />

        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground text-sm">Host</dt>
            <dd className="mt-1 truncate font-mono text-sm">{url.origin}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground text-sm">Path</dt>
            <dd className="mt-1 truncate font-mono text-sm">{url.pathname}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
