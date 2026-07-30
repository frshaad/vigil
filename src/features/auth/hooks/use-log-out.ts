import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';

export function useLogOut() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function logOut() {
    try {
      await authClient.signOut({
        fetchOptions: {
          onRequest() {
            setIsPending(true);
          },
          onSuccess() {
            router.push('/login');
          },
          onError({ error }) {
            toast.error(error.message);
          },
        },
      });
    } catch {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  }

  return { logOut, isPending };
}
