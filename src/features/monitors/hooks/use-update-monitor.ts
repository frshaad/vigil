'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import type { Monitor } from '@/../prisma/generated/client';

import { updateMonitor } from '../actions/update-monitor';
import { updateMonitorSchema } from '../schema';

export function useUpdateMonitor(monitor: Pick<Monitor, 'id' | 'name' | 'url' | 'method'>) {
  const router = useRouter();

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateMonitor,
    zodResolver(updateMonitorSchema),
    {
      formProps: {
        defaultValues: {
          id: monitor.id,
          name: monitor.name,
          url: monitor.url,
          method: monitor.method,
        },
      },
      actionProps: {
        onSuccess({ data }) {
          form.reset({ id: data.id, name: data.name, url: data.url, method: data.method });
          toast.success('Monitor updated.');
          router.refresh();
        },
        onError({ error }) {
          toast.error(error.serverError ?? 'Failed to update monitor.');
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
