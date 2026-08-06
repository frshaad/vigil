import { useState } from 'react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';

type UseRevokeOtherSessionsOptions = {
  onRevoked?: () => void | Promise<void>;
};

export function useRevokeOtherSessions(options: UseRevokeOtherSessionsOptions = {}) {
  const [isPending, setIsPending] = useState(false);

  async function revokeOtherSessions() {
    try {
      await authClient.revokeOtherSessions({
        fetchOptions: {
          onRequest() {
            setIsPending(true);
          },
          async onSuccess() {
            await options.onRevoked?.();
          },
          onError({ error }) {
            toast.error(error.message ?? DEFAULT_ERROR_MESSAGE);
          },
          onResponse() {
            setIsPending(false);
          },
        },
      });
    } catch {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  }

  return {
    revokeOtherSessions,
    isPending,
  };
}
