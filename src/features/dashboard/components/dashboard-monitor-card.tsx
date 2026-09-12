'use client';

import { IconLoader2, IconPin, IconPinFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { formatInterval, formatResponseTime } from '@/features/monitors/utils';
import { cn } from '@/lib/utils';

import { toggleMonitorPin } from '../actions/toggle-monitor-pin';

interface DashboardMonitorCardProps {
  monitor: {
    id: string;
    name: string;
    url: string;
    method: string;
    isActive: boolean;
    lastStatus: 'UNKNOWN' | 'UP' | 'DOWN';
    lastStatusCode: number | null;
    lastResponseTimeMs: number | null;
    lastCheckedAt: Date | null;
    intervalSeconds: number;
  };
  isPinned: boolean;
}

const statusConfig = {
  UP: {
    label: 'Up',
    className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  DOWN: {
    label: 'Down',
    className: 'border-destructive/30 bg-destructive/10 text-destructive',
  },
  UNKNOWN: {
    label: 'Unknown',
    className: 'bg-muted text-muted-foreground',
  },
} as const;

function MonitorStatus({ status }: { status: 'UNKNOWN' | 'UP' | 'DOWN' }) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

export default function DashboardMonitorCard({
  monitor,
  isPinned: initialIsPinned,
}: DashboardMonitorCardProps) {
  const router = useRouter();

  const [isPinned, setIsPinned] = useState(initialIsPinned);
  const [isPending, setIsPending] = useState(false);

  const handleTogglePin = async () => {
    const nextIsPinned = !isPinned;

    setIsPinned(nextIsPinned);
    setIsPending(true);

    const result = await toggleMonitorPin({
      monitorId: monitor.id,
      pinned: nextIsPinned,
    });

    setIsPending(false);

    if (result.serverError || result.validationErrors) {
      setIsPinned(!nextIsPinned);
      return;
    }

    router.refresh();
  };

  return (
    <div className="group bg-card hover:bg-muted/30 flex items-center gap-3 rounded-lg border p-4 transition-colors">
      <Link href={`/dashboard/monitors/${monitor.id}`} className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="truncate font-medium">{monitor.name}</h3>

          <span className="bg-muted shrink-0 rounded px-1.5 py-0.5 text-xs font-medium">
            {monitor.method}
          </span>

          <MonitorStatus status={monitor.lastStatus} />
        </div>

        <p className="text-muted-foreground mt-1 truncate text-sm">{monitor.url}</p>

        <div className="text-muted-foreground mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <span>{formatInterval(monitor.intervalSeconds)}</span>

          <span>HTTP {monitor.lastStatusCode ?? '—'}</span>

          <span>{formatResponseTime(monitor.lastResponseTimeMs)}</span>
        </div>
      </Link>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        disabled={isPending}
        onClick={() => {
          void handleTogglePin();
        }}
        aria-label={isPinned ? `Unpin ${monitor.name}` : `Pin ${monitor.name}`}
      >
        {isPending ? (
          <IconLoader2 className="size-4 animate-spin" />
        ) : isPinned ? (
          <IconPinFilled className="size-4" />
        ) : (
          <IconPin className="size-4" />
        )}
      </Button>
    </div>
  );
}
