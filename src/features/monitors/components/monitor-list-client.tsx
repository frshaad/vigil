'use client';

import { useMemo } from 'react';

import type { MonitorListItem } from '../dal';
import { filterMonitors } from '../filter-monitors';
import { useDeleteMonitor } from '../hooks/use-delete-monitor';
import { useMonitorFilters } from '../hooks/use-monitor-filters';
import MonitorCard from './monitor-card';
import MonitorFilters from './monitor-filters';
import MonitorNoResults from './monitor-no-results';

interface MonitorListClientProps {
  monitors: MonitorListItem[];
}

export default function MonitorListClient({ monitors }: MonitorListClientProps) {
  const { deleteMonitor, deletingId } = useDeleteMonitor();

  const [{ search, status, state }] = useMonitorFilters();

  const filteredMonitors = useMemo(
    () =>
      filterMonitors(monitors, {
        search,
        status,
        state,
      }),
    [monitors, search, status, state],
  );

  const hasFilters = search !== '' || status !== 'all' || state !== 'all';

  return (
    <div className="space-y-4">
      <MonitorFilters />

      <div className="text-muted-foreground text-sm">
        {hasFilters
          ? `${filteredMonitors.length} of ${monitors.length} monitors`
          : `${monitors.length} ${monitors.length === 1 ? 'monitor' : 'monitors'}`}
      </div>

      {filteredMonitors.length === 0 ? (
        <MonitorNoResults />
      ) : (
        <div className="space-y-3">
          {filteredMonitors.map((monitor) => (
            <MonitorCard
              key={monitor.id}
              monitor={monitor}
              isDeleting={deletingId === monitor.id}
              onDeleteAction={deleteMonitor}
            />
          ))}
        </div>
      )}
    </div>
  );
}
