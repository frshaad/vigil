'use client';

import type { Route } from 'next';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import type { Provider } from '@/lib/auth';
import { authClient } from '@/lib/auth/client';

export function useSocialLogin(provider: Provider) {
  const searchParams = useSearchParams();
  const callbackURL = (searchParams.get('redirect') ?? '/') as Route;

  const isProviderLastMethod = authClient.isLastUsedLoginMethod(provider);

  const [isPending, startTransition] = useTransition();

  function signInSocial() {
    startTransition(async () => {
      try {
        const { error } = await authClient.signIn.social({
          provider,
          callbackURL,
        });
        if (error) {
          toast.error(error.message ?? 'An error occurred');
        }
      } catch {
        toast.error('An error occurred');
      }
    });
  }

  return { isPending, signIn: signInSocial, isProviderLastMethod };
}
