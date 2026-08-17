'use client';

import type { Prisma } from '@/../prisma/generated/client';

import type { monitorSelect } from '../dal';
import { useDeleteMonitor } from '../hooks/use-delete-monitor';
import MonitorCard from './monitor-card';

type MonitorListItem = Prisma.MonitorGetPayload<{
  select: typeof monitorSelect;
}>;

interface MonitorListClientProps {
  monitors: MonitorListItem[];
}

export default function MonitorListClient({ monitors }: MonitorListClientProps) {
  const { deleteMonitor, deletingId } = useDeleteMonitor();

  return (
    <div className="space-y-3">
      {monitors.map((monitor) => (
        <MonitorCard
          key={monitor.id}
          monitor={monitor}
          isDeleting={deletingId === monitor.id}
          onDeleteAction={deleteMonitor}
        />
      ))}
    </div>
  );
}
