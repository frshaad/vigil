'use client';

import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { checkMonitor } from '../actions/check-monitor';

export function useCheckMonitor() {
  const router = useRouter();

  const { execute, isExecuting } = useAction(checkMonitor, {
    onSuccess({ data }) {
      router.refresh();

      if (data.status === 'UP') {
        toast.success('Monitor is operational.');
      } else {
        toast.error(data.error === null ? 'Monitor is down.' : `Monitor is down: ${data.error}`);
      }
    },

    onError({ error }) {
      toast.error(error.serverError ?? 'Failed to check monitor.');
    },
  });

  return {
    check: execute,
    isPending: isExecuting,
  };
}
