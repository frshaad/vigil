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
import DeleteMonitorDialog from './delete-monitor-dialog';
import MonitorStatusBadge from './monitor-status-badge';

type MonitorCardProps = {
  monitor: Pick<Monitor, 'id' | 'name' | 'url' | 'method' | 'isActive'>;
  isDeleting: boolean;
  onDeleteAction: (id: string) => void;
};

export default function MonitorCard({ monitor, isDeleting, onDeleteAction }: MonitorCardProps) {
  const { isActive, isPending, toggle } = useToggleMonitor(monitor);

  let activationButtonLabel: string;

  if (isPending) {
    activationButtonLabel = 'Updating…';
  } else if (isActive) {
    activationButtonLabel = 'Pause';
  } else {
    activationButtonLabel = 'Activate';
  }

  return (
    <Item variant="outline">
      <ItemMedia
        variant="icon"
        className={cn(
          'flex size-10 shrink-0 items-center justify-center ',
          isActive
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {isActive ? <IconActivity className="size-5" /> : <IconPlayerPause className="size-5" />}
      </ItemMedia>

      <ItemContent>
        <Link
          href={`/monitors/${monitor.id}`}
          className="group focus-visible:ring-ring min-w-0 outline-none focus-visible:ring-2"
        >
          <ItemTitle className="flex flex-wrap items-center gap-4">
            <h3 className="text-sm font-semibold">{monitor.name}</h3>

            <Badge variant="outline">{monitor.method}</Badge>

            <MonitorStatusBadge isActive={isActive} />
          </ItemTitle>

          <ItemDescription>{monitor.url}</ItemDescription>
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
