import { useState } from 'react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';

type UseRevokeAllSessionsOptions = {
  onRevoked?: () => void | Promise<void>;
};

export function useRevokeAllSessions(options: UseRevokeAllSessionsOptions = {}) {
  const [isPending, setIsPending] = useState(false);

  async function revokeAllSessions() {
    try {
      await authClient.revokeSessions({
        fetchOptions: {
          onRequest() {
            setIsPending(true);
          },
          async onSuccess() {
            await options.onRevoked?.();
            toast.success('All sessions revoked.');
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
    revokeAllSessions,
    isPending,
  };
}
