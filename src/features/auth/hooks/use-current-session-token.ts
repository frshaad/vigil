import { authClient } from '@/lib/auth/client';

export function useCurrentSessionToken() {
  const { data: currentSession } = authClient.useSession();

  return currentSession?.session.token ?? null;
}
