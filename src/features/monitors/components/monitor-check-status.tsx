import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react';

import type { MonitorStatus } from '@/../prisma/generated/enums';

interface MonitorCheckStatusProps {
  status: MonitorStatus;
}

export default function MonitorCheckStatus({ status }: MonitorCheckStatusProps) {
  const isUp = status === 'UP';

  return (
    <span
      className="inline-flex items-center gap-1.5 text-sm font-medium"
      aria-label={isUp ? 'Up' : 'Down'}
    >
      {isUp ? (
        <IconCircleCheck className="size-4 text-emerald-600" />
      ) : (
        <IconExclamationCircle className="text-destructive size-4" />
      )}

      {isUp ? 'Up' : 'Down'}
    </span>
  );
}
