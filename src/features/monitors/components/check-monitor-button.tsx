'use client';

import { IconRefresh } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

import { useCheckMonitor } from '../hooks/use-check-monitor';

interface CheckMonitorButtonProps {
  monitorId: string;
}

export default function CheckMonitorButton({ monitorId }: CheckMonitorButtonProps) {
  const { check, isPending } = useCheckMonitor();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => check({ id: monitorId })}
      disabled={isPending}
    >
      <IconRefresh className={isPending ? 'animate-spin' : undefined} />
      {isPending ? 'Checking…' : 'Check now'}
    </Button>
  );
}
