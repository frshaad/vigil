import { notFound } from 'next/navigation';

import UpdateMonitorForm from '@/features/monitors/components/update-monitor-form';
import { getMonitor } from '@/features/monitors/dal';
import { getCurrentUserOrRedirect } from '@/lib/auth/session';

export default async function MonitorPage({
  params,
}: PageProps<'/dashboard/monitors/[monitorId]'>) {
  const { monitorId } = await params;
  const user = await getCurrentUserOrRedirect();

  const monitor = await getMonitor(monitorId, user.id);

  if (!monitor) {
    notFound();
  }

  return (
    <div className="max-w-lg space-y-3">
      <h1>Monitor: {monitor.name}</h1>
      <UpdateMonitorForm monitor={monitor} />
    </div>
  );
}
