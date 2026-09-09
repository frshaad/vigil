'use client';

import { IconActivity, IconPlayerPause } from '@tabler/icons-react';
import Link from 'next/link';

import type { Monitor } from '@/../prisma/generated/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { cn } from '@/lib/utils';

import { useToggleMonitor } from '../hooks/use-toggle-monitor';
import { formatInterval, formatLastChecked, formatResponseTime } from '../utils';
import DeleteMonitorDialog from './delete-monitor-dialog';
import MonitorStatusBadge from './monitor-status-badge';

type MonitorCardProps = {
  monitor: Omit<Monitor, 'userId' | 'createdAt' | 'updatedAt'>;
  isDeleting: boolean;
  onDeleteAction: (id: string) => void;
};

export default function MonitorCard({ monitor, isDeleting, onDeleteAction }: MonitorCardProps) {
  const { isActive, isPending, toggle } = useToggleMonitor(monitor);

  const activationButtonLabel = isPending ? 'Updating…' : isActive ? 'Pause' : 'Activate';

  return (
    <Item variant="outline">
      <ItemMedia
        variant="icon"
        className={cn(
          'flex size-10 shrink-0 items-center justify-center',
          monitor.lastStatus === 'UP'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : monitor.lastStatus === 'DOWN'
              ? 'bg-destructive/10 text-destructive'
              : 'bg-muted text-muted-foreground',
        )}
      >
        {isActive ? <IconActivity className="size-5" /> : <IconPlayerPause className="size-5" />}
      </ItemMedia>

      <ItemContent className="min-w-0">
        <Link
          href={`/monitors/${monitor.id}`}
          className="group focus-visible:ring-ring min-w-0 outline-none focus-visible:ring-2"
        >
          <ItemTitle className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="truncate text-sm font-semibold">{monitor.name}</h3>

            <Badge variant="outline">{monitor.method}</Badge>

            <MonitorStatusBadge status={monitor.lastStatus} />

            {!isActive && (
              <Badge variant="outline" className="text-muted-foreground">
                Paused
              </Badge>
            )}
          </ItemTitle>

          <ItemDescription className="mt-1 truncate">{monitor.url}</ItemDescription>

          <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span>{formatInterval(monitor.intervalSeconds)}</span>

            <span aria-hidden>•</span>

            <span>HTTP {monitor.lastStatusCode ?? '—'}</span>

            <span aria-hidden>•</span>

            <span>{formatResponseTime(monitor.lastResponseTimeMs)}</span>

            <span aria-hidden>•</span>

            <span>{formatLastChecked(monitor.lastCheckedAt)}</span>
          </div>
        </Link>
      </ItemContent>

      <ItemActions>
        <Button
          type="button"
          variant={isActive ? 'secondary' : 'default'}
          size="sm"
          onClick={toggle}
          disabled={isPending || isDeleting}
          aria-pressed={isActive}
          aria-label={isActive ? `Pause ${monitor.name}` : `Activate ${monitor.name}`}
        >
          {activationButtonLabel}
        </Button>

        <DeleteMonitorDialog
          monitorName={monitor.name}
          isDeleting={isDeleting}
          onConfirmAction={() => onDeleteAction(monitor.id)}
        />
      </ItemActions>
    </Item>
  );
}
