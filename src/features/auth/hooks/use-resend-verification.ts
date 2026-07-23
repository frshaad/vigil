'use client';

import type { Route } from 'next';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';

export function useResendVerification(options?: { callbackURL?: Route }) {
  const { data: session } = authClient.useSession();
  const [isPending, startTransition] = useTransition();

  const callbackURL = options?.callbackURL ?? ('/settings/profile' as Route);

  function resend() {
    const email = session?.user.email;

    if (email === undefined) {
      return;
    }

    startTransition(async () => {
      try {
        await authClient.sendVerificationEmail(
          { email, callbackURL },
          {
            onSuccess() {
              toast.success('Verification email sent.');
            },
            onError({ error }) {
              toast.error(error.message ?? DEFAULT_ERROR_MESSAGE);
            },
          }
        );
      } catch {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    });
  }

  return { resend, isPending };
}
