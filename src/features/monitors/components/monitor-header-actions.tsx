'use client';

import { IconExternalLink } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { useDeleteMonitor } from '../hooks/use-delete-monitor';
import CheckMonitorButton from './check-monitor-button';
import DeleteMonitorDialog from './delete-monitor-dialog';

interface MonitorHeaderActionsProps {
  monitorId: string;
  monitorName: string;
  monitorUrl: string;
  cooldownRemaining: number;
}

export default function MonitorHeaderActions({
  monitorId,
  monitorName,
  monitorUrl,
  cooldownRemaining,
}: MonitorHeaderActionsProps) {
  const router = useRouter();

  const { deleteMonitor, deletingId } = useDeleteMonitor({
    onSuccess: () => {
      router.push('/dashboard/monitors');
    },
  });

  const isDeleting = deletingId === monitorId;

  return (
    <div className="flex items-center gap-2">
      <CheckMonitorButton monitorId={monitorId} cooldownRemaining={cooldownRemaining} />

      <Button
        variant="outline"
        size="sm"
        nativeButton={false}
        render={
          <a href={monitorUrl} target="_blank" rel="noopener noreferrer" aria-label={monitorName} />
        }
      >
        Open URL
        <IconExternalLink />
      </Button>

      <DeleteMonitorDialog
        monitorName={monitorName}
        isDeleting={isDeleting}
        onConfirmAction={() => deleteMonitor(monitorId)}
      />
    </div>
  );
}
