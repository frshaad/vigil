'use client';

import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { MANUAL_CHECK_COOLDOWN_SECONDS } from '@/features/monitoring/checker/constants';

import { checkMonitor } from '../actions/check-monitor';

interface UseCheckMonitorOptions {
  lastCheckedAt: Date | null;
}

export function useCheckMonitor({ lastCheckedAt }: UseCheckMonitorOptions) {
  const router = useRouter();

  const initialCooldownUntil = lastCheckedAt
    ? lastCheckedAt.getTime() + MANUAL_CHECK_COOLDOWN_SECONDS * 1000
    : null;

  const [cooldownUntil, setCooldownUntil] = useState<number | null>(initialCooldownUntil);
  const [now, setNow] = useState(() => Date.now());

  const { execute, isExecuting } = useAction(checkMonitor, {
    onSuccess({ data }) {
      setCooldownUntil(Date.now() + MANUAL_CHECK_COOLDOWN_SECONDS * 1000);

      router.refresh();

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
    if (cooldownUntil === null) {
      return;
    }

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => window.clearInterval(interval);
  }, [cooldownUntil]);

  const cooldownRemaining =
    cooldownUntil === null
      ? 0
      : Math.min(
          MANUAL_CHECK_COOLDOWN_SECONDS,
          Math.max(0, Math.ceil((cooldownUntil - now) / 1000))
        );

  const isCooldown = cooldownRemaining > 0;
  const isPending = isExecuting;
  const canCheck = !isPending && !isCooldown;

  return {
    check: execute,
    isPending,
    canCheck,
    cooldownRemaining,
  };
}
