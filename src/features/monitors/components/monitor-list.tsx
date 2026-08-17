import { getCurrentUserOrRedirect } from '@/lib/auth/session';

import { getUserMonitors } from '../dal';
import MonitorEmptyState from './monitor-empty-state';
import MonitorListClient from './monitor-list-client';

export default async function MonitorList() {
  const user = await getCurrentUserOrRedirect({ callbackURL: '/monitors' });

  const monitors = await getUserMonitors(user.id);

  if (monitors.length === 0) {
    return <MonitorEmptyState />;
  }

  return <MonitorListClient monitors={monitors} />;
}
