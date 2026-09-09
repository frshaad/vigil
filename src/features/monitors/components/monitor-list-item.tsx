import { IconActivity, IconPlayerPause } from '@tabler/icons-react';
import Link from 'next/link';

import type { Monitor } from '@/../prisma/generated/client';
import { Badge } from '@/components/ui/badge';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import MonitorStatusBadge from './monitor-status-badge';

type MonitorListItemProps = {
  monitor: Pick<Monitor, 'id' | 'name' | 'url' | 'method' | 'isActive' | 'lastStatus'>;
};

export default function MonitorListItem({ monitor }: MonitorListItemProps) {
  return (
    <Item variant="outline" render={<Link href={`/monitors/${monitor.id}`} />}>
      <ItemMedia
        variant="icon"
        className={
          monitor.isActive
            ? 'flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg'
        }
      >
        {monitor.isActive ? (
          <IconActivity className="size-5" />
        ) : (
          <IconPlayerPause className="size-5" />
        )}
      </ItemMedia>

      <ItemContent>
        <ItemTitle className="flex flex-wrap items-center gap-2">
          {monitor.name}

          <Badge variant="outline">{monitor.method}</Badge>

          <MonitorStatusBadge status={monitor.lastStatus} />
        </ItemTitle>

        <ItemDescription>{monitor.url}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
