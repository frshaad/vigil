'use client';

import { useOptimisticAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import type { Monitor } from '@/../prisma/generated/client';

import { toggleMonitor } from '../actions/toggle-monitor';

type MonitorToggleState = Pick<Monitor, 'id' | 'isActive'>;

export function useToggleMonitor(monitor: MonitorToggleState) {
  const { execute, optimisticState, isExecuting } = useOptimisticAction(toggleMonitor, {
    currentState: monitor,

    updateFn: (state, input) => ({
      ...state,
      isActive: input.isActive,
    }),

    onError({ error }) {
      toast.error(error.serverError ?? 'Failed to update monitor.');
    },
  });

  function toggle() {
    execute({
      id: monitor.id,
      isActive: !optimisticState.isActive,
    });
  }

  return {
    isActive: optimisticState.isActive,
    isPending: isExecuting,
    toggle,
  };
}
