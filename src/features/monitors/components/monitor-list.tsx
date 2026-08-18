import { getUserMonitors } from '../dal';
import MonitorEmptyState from './monitor-empty-state';
import MonitorListClient from './monitor-list-client';

interface MonitorListProps {
  userId: string;
}

export default async function MonitorList({ userId }: MonitorListProps) {
  const monitors = await getUserMonitors(userId);

  if (monitors.length === 0) {
    return <MonitorEmptyState />;
  }

  return <MonitorListClient monitors={monitors} />;
}
