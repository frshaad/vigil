'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

export function useLogOut() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function clientSignOut() {
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
        toast.error('An error occurred');
      }
    });
  }

  return { signOut: clientSignOut, isPending };
}
