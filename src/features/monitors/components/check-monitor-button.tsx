'use client';

import { IconRefresh } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

import { useCheckMonitor } from '../hooks/use-check-monitor';

interface CheckMonitorButtonProps {
  monitorId: string;
  lastCheckedAt: Date | null;
}

export default function CheckMonitorButton({ monitorId, lastCheckedAt }: CheckMonitorButtonProps) {
  const { check, isPending, canCheck, cooldownRemaining } = useCheckMonitor({ lastCheckedAt });

  let label = 'Check now';

  if (isPending) {
    label = 'Checking…';
  } else if (cooldownRemaining > 0) {
    label = `Check again in ${cooldownRemaining}s`;
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={!canCheck}
      onClick={() => check({ id: monitorId })}
    >
      <IconRefresh className={isPending ? 'animate-spin' : undefined} />
      {label}
    </Button>
  );
}
