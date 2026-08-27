'use client';

import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { MONITOR_MANUAL_CHECK_COOLDOWN_MS } from '@/features/monitoring/checker/constants';

import { checkMonitor } from '../actions/check-monitor';

const MANUAL_CHECK_COOLDOWN_SECONDS = MONITOR_MANUAL_CHECK_COOLDOWN_MS / 1000;

type UseCheckMonitorOptions = {
  monitorId: string;
  initialCooldownRemaining: number;
};

export function useCheckMonitor({ monitorId, initialCooldownRemaining }: UseCheckMonitorOptions) {
  const router = useRouter();

  const [cooldownRemaining, setCooldownRemaining] = useState(initialCooldownRemaining);

  const { execute, isExecuting } = useAction(checkMonitor, {
    onSuccess({ data }) {
      router.refresh();
      setCooldownRemaining(MANUAL_CHECK_COOLDOWN_SECONDS);

      if (data.status === 'UP') {
        toast.success('Monitor is operational.');
      } else {
        toast.error(data.error ?? 'Monitor is down.');
      }
    },

    onError({ error }) {
      toast.error(error.serverError ?? 'Failed to check monitor.');
    },
  });

  useEffect(() => {
    if (cooldownRemaining <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setCooldownRemaining((remaining) => {
        if (remaining <= 1) {
          window.clearInterval(interval);
          return 0;
        }

        return remaining - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [cooldownRemaining]);

  return {
    check: () => execute({ id: monitorId }),
    isPending: isExecuting,
    cooldownRemaining,
    isCooldownActive: cooldownRemaining > 0,
  };
}
