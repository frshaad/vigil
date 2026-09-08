'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createMonitor } from '../actions/create-monitor';
import { createMonitorSchema } from '../schema';

export function useCreateMonitor() {
  const router = useRouter();

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createMonitor,
    zodResolver(createMonitorSchema),
    {
      formProps: {
        defaultValues: { name: '', url: '', method: 'GET' },
      },
      actionProps: {
        onSuccess({ data }) {
          router.push(`/monitors/${data.id}`);
        },
        onError({ error }) {
          toast.error(error.serverError ?? 'Failed to create monitor.');
        },
      },
    },
  );

  return {
    form,
    handleSubmit: handleSubmitWithAction,
    isPending: action.isPending,
    serverError: action.result.serverError,
  };
}
