'use client';

import { useSortable } from '@dnd-kit/react/sortable';
import { IconGripVertical } from '@tabler/icons-react';

import DashboardMonitorCard from './dashboard-monitor-card';

interface SortableDashboardMonitorProps {
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
  index: number;
}

export default function SortableDashboardMonitor({
  monitor,
  index,
}: SortableDashboardMonitorProps) {
  const { ref, handleRef, isDragging } = useSortable({
    id: monitor.id,
    index,
  });

  return (
    <div ref={ref} className={isDragging ? 'opacity-50' : undefined}>
      <div className="flex items-center gap-1">
        <button
          ref={handleRef}
          type="button"
          className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 shrink-0 touch-none items-center justify-center rounded-md transition-colors active:cursor-grabbing"
          aria-label={`Reorder ${monitor.name}`}
        >
          <IconGripVertical className="size-4" />
        </button>

        <div className="min-w-0 flex-1">
          <DashboardMonitorCard monitor={monitor} isPinned />
        </div>
      </div>
    </div>
  );
}
