import type { Monitor } from '@/../prisma/generated/client';

import MonitorEmptyState from './monitor-empty-state';
import MonitorListItem from './monitor-list-item';

type MonitorListProps = {
  monitors: Pick<Monitor, 'id' | 'name' | 'url' | 'method' | 'isActive'>[];
};

export default function MonitorList({ monitors }: MonitorListProps) {
  if (monitors.length === 0) {
    return <MonitorEmptyState />;
  }

  return (
    <div className="space-y-3">
      {monitors.map((monitor) => (
        <MonitorListItem key={monitor.id} monitor={monitor} />
      ))}
    </div>
  );
}
