'use client';

import { IconRefresh } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

import { useCheckMonitor } from '../hooks/use-check-monitor';

interface CheckMonitorButtonProps {
  monitorId: string;
  cooldownRemaining: number;
}

export default function CheckMonitorButton({
  monitorId,
  cooldownRemaining,
}: CheckMonitorButtonProps) {
  const {
    check,
    isPending,
    cooldownRemaining: remaining,
  } = useCheckMonitor({
    monitorId,
    initialCooldownRemaining: cooldownRemaining,
  });

  const isDisabled = isPending || remaining > 0;

  let label = 'Check now';

  if (isPending) {
    label = 'Checking…';
  } else if (remaining > 0) {
    label = `Check again in ${remaining}s`;
  }

  return (
    <Button type="button" variant="outline" size="sm" disabled={isDisabled} onClick={() => check()}>
      <IconRefresh className={isPending ? 'animate-spin' : undefined} />
      {label}
    </Button>
  );
}
