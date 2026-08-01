import { useCallback, useEffect, useState } from 'react';
import z from 'zod';

import { authClient } from '@/lib/auth/client';
import { ValidationError } from '@/lib/errors';

import { sessionInfoSchema } from '../schemas/session';
import type { SessionInfo } from '../schemas/session';

type SessionsState =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; sessions: SessionInfo[] };

export function useSessions() {
  const [state, setState] = useState<SessionsState>({ status: 'loading' });

  const loadSessions = useCallback(async () => {
    await authClient.listSessions({
      fetchOptions: {
        onSuccess({ data }) {
          try {
            const sessions = z.array(sessionInfoSchema).parse(data);
            setState({ status: 'success', sessions });
          } catch (error) {
            if (error instanceof z.ZodError) {
              setState({ status: 'error', error: new ValidationError(error) });
            }
          }
        },
        onError({ error }) {
          setState({ status: 'error', error });
        },
      },
    });
  }, []);

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  return {
    sessionsState: state,
    refetch: loadSessions,
  };
}
