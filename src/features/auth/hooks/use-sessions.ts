import { useCallback, useEffect, useState } from 'react';
import z from 'zod';

import { authClient } from '@/lib/auth/client';
import { ValidationError } from '@/lib/errors';

const sessionInfoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  expiresAt: z.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
});

export type SessionInfo = z.infer<typeof sessionInfoSchema>;

type SessionsState =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; sessions: SessionInfo[] };

export function useSessions() {
  const { data: currentSession } = authClient.useSession();
  const [sessionsState, setSessionsState] = useState<SessionsState>({ status: 'loading' });

  const loadSessions = useCallback(async () => {
    await authClient.listSessions({
      fetchOptions: {
        onSuccess({ data }) {
          try {
            const validated = z.array(sessionInfoSchema).parse(data);
            setSessionsState({ status: 'success', sessions: validated });
          } catch (error) {
            if (error instanceof z.ZodError) {
              setSessionsState({ status: 'error', error: new ValidationError(error) });
            }
          }
        },
        onError({ error }) {
          setSessionsState({ status: 'error', error });
        },
      },
    });
  }, []);

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  return {
    sessionsState,
    currentSessionToken: currentSession?.session.token ?? null,
    refetch: loadSessions,
  };
}
