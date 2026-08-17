'use client';

import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { deleteMonitor } from '../actions/delete-monitor';

export function useDeleteMonitor() {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { execute } = useAction(deleteMonitor, {
    onSuccess() {
      toast.success('Monitor deleted.');
      router.refresh();
    },

    onError({ error }) {
      toast.error(error.serverError ?? 'Failed to delete monitor.');
    },

    onSettled() {
      setDeletingId(null);
    },
  });

  function handleDelete(id: string) {
    setDeletingId(id);
    execute({ id });
  }

  return {
    deleteMonitor: handleDelete,
    deletingId,
  };
}
