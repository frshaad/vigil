import type { getUserMonitors } from './dal';
import type { MonitorSearchParams } from './search-params';

export type Monitors = Awaited<ReturnType<typeof getUserMonitors>>;

export function filterMonitors(monitors: Monitors, filters: MonitorSearchParams): Monitors {
  const search = filters.search.trim().toLowerCase();

  return monitors.filter((monitor) => {
    const matchesSearch =
      search === '' ||
      monitor.name.toLowerCase().includes(search) ||
      monitor.url.toLowerCase().includes(search);

    const matchesStatus = filters.status === 'all' || monitor.lastStatus === filters.status;

    const matchesState =
      filters.state === 'all' ||
      (filters.state === 'active' ? monitor.isActive : !monitor.isActive);

    return matchesSearch && matchesStatus && matchesState;
  });
}
