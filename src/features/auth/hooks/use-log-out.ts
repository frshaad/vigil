'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';

export function useLogOut() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function logOut() {
    startTransition(async () => {
      try {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push('/login');
            },
            onError: ({ error }) => {
              toast.error(error.message);
            },
          },
        });
      } catch {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    });
  }

  return { logOut, isPending };
}
