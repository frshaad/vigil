import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import type { Provider } from '@/lib/auth';
import { authClient } from '@/lib/auth/client';
import { getCallbackURL } from '@/lib/helpers/url';

import { DEFAULT_ERROR_MESSAGE } from '../constants';

export function useSocialLogin(provider: Provider) {
  const [isPending, setIsPending] = useState(false);
  const callbackURL = getCallbackURL(useSearchParams());
  const isProviderLastMethod = authClient.isLastUsedLoginMethod(provider);

  async function signIn() {
    try {
      await authClient.signIn.social(
        { provider, callbackURL },
        {
          onRequest() {
            setIsPending(true);
          },
          onError(ctx) {
            toast.error(ctx.error.message);
          },
          onResponse() {
            setIsPending(false);
          },
        }
      );
    } catch {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  }

  return { isPending, signIn, isProviderLastMethod };
}
