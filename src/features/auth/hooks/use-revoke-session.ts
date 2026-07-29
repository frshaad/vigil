import { useState } from 'react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';

type UseRevokeSessionOptions = {
  onRevoked?: () => void | Promise<void>;
};

export function useRevokeSession(options: UseRevokeSessionOptions = {}) {
  const [pendingToken, setPendingToken] = useState<string | null>(null);

  async function revokeSession(token: string) {
    try {
      await authClient.revokeSession(
        { token },
        {
          onRequest() {
            setPendingToken(token);
          },
          async onSuccess() {
            await options.onRevoked?.();
            toast.success('Session revoked.');
          },
          onError({ error }) {
            toast.error(error.message ?? DEFAULT_ERROR_MESSAGE);
          },
          onResponse() {
            setPendingToken(null);
          },
        }
      );
    } catch {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  }

  return {
    revokeSession,
    pendingToken,
    isPending: pendingToken !== null,
  };
}
