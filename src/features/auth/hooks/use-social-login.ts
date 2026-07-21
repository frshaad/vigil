'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { toast } from 'sonner';

import type { Provider } from '@/lib/auth';
import { authClient } from '@/lib/auth/client';
import { getCallbackURL } from '@/lib/helpers/url';

import { DEFAULT_ERROR_MESSAGE } from '../constants';

export function useSocialLogin(provider: Provider) {
  const [isPending, startTransition] = useTransition();
  const callbackURL = getCallbackURL(useSearchParams());
  const isProviderLastMethod = authClient.isLastUsedLoginMethod(provider);

  const signIn = useCallback(() => {
    startTransition(async () => {
      try {
        await authClient.signIn.social(
          { provider, callbackURL },
          {
            onError(ctx) {
              toast.error(ctx.error.message);
            },
          }
        );
      } catch {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    });
  }, [callbackURL, provider]);

  return { isPending, signIn, isProviderLastMethod };
}
