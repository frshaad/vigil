import type { Route } from 'next';
import { useState } from 'react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';

export function useResendVerification(options?: { callbackURL?: Route }) {
  const { data: session } = authClient.useSession();
  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const callbackURL = options?.callbackURL ?? '/settings/profile';

  async function resend() {
    const email = session?.user.email;

    if (email === undefined || email === '') {
      return;
    }

    try {
      await authClient.sendVerificationEmail(
        { email, callbackURL },
        {
          onRequest() {
            setIsPending(true);
          },
          onSuccess() {
            toast.success('Verification email sent.');
          },
          onError({ error }) {
            toast.error(error.message ?? DEFAULT_ERROR_MESSAGE);
          },
          onResponse() {
            setIsPending(false);
            setIsSent(true);
          },
        }
      );
    } catch {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  }

  return { resend, isPending, isSent };
}
