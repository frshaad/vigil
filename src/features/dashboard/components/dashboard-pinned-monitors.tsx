'use client';

import { move } from '@dnd-kit/helpers';
import type { DragEndEvent } from '@dnd-kit/react';
import { DragDropProvider } from '@dnd-kit/react';
import { useState } from 'react';

import { reorderPinnedMonitors } from '../actions/reorder-pinned-monitors';
import SortableDashboardMonitor from './sortable-dashboard-monitor';

interface Monitor {
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
}

interface DashboardPinnedMonitorsProps {
  monitors: Monitor[];
}

export default function DashboardPinnedMonitors({
  monitors: initialMonitors,
}: DashboardPinnedMonitorsProps) {
  const [monitors, setMonitors] = useState(initialMonitors);

  const handleDragEnd = async (event: DragEndEvent) => {
    if (event.canceled) {
      return;
    }

    const nextMonitors = move(monitors, event);

    if (nextMonitors === monitors) {
      return;
    }

    const previousMonitors = monitors;

    setMonitors(nextMonitors);

    const result = await reorderPinnedMonitors({
      monitorIds: nextMonitors.map((monitor) => monitor.id),
    });

    if (result.serverError || result.validationErrors) {
      setMonitors(previousMonitors);
    }
  };

  return (
    <DragDropProvider
      onDragEnd={(e) => {
        void handleDragEnd(e);
      }}
    >
      <div className="space-y-3">
        {monitors.map((monitor, index) => (
          <SortableDashboardMonitor key={monitor.id} monitor={monitor} index={index} />
        ))}
      </div>
    </DragDropProvider>
  );
}
