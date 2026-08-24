import { IconActivity, IconExternalLink, IconPointFilled } from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';

import type { Monitor } from '@/../prisma/generated/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import CheckMonitorButton from './check-monitor-button';

type MonitorHeaderProps = {
  monitor: Pick<Monitor, 'id' | 'name' | 'url' | 'method' | 'isActive' | 'lastCheckedAt'>;
};

export default function MonitorHeader({ monitor }: MonitorHeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl">
          <IconActivity className="size-6" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-2xl font-semibold tracking-tight">{monitor.name}</h1>

            <Badge variant="outline">
              <IconPointFilled
                className={monitor.isActive ? 'text-emerald-500' : 'text-muted-foreground'}
              />
              {monitor.isActive ? 'Monitoring' : 'Paused'}
            </Badge>
          </div>

          <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-medium">{monitor.method}</span>
            <span aria-hidden>·</span>
            <span className="truncate">{monitor.url}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <CheckMonitorButton monitorId={monitor.id} lastCheckedAt={monitor.lastCheckedAt} />

        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href={monitor.url as Route} target="_blank" rel="noopener noreferrer" />}
        >
          Open URL
          <IconExternalLink />
        </Button>
      </div>
    </header>
  );
}
