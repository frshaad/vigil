import { useCallback, useEffect, useRef, useState } from 'react';
import z from 'zod';

import { authClient } from '@/lib/auth/client';
import { ValidationError } from '@/lib/errors';

import { sessionInfoSchema } from '../schemas/session';
import type { SessionInfo } from '../schemas/session';

const sessionsSchema = z.array(sessionInfoSchema);

export function useSessions() {
  const isFirstLoad = useRef(true);

  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadSessions = useCallback(async () => {
    await authClient.listSessions({
      fetchOptions: {
        onRequest() {
          setError(null);

          if (isFirstLoad.current) {
            setIsLoading(true);
          } else {
            setIsRefreshing(true);
          }
        },
        onSuccess({ data }) {
          try {
            const sessionsList = sessionsSchema.parse(data);
            setSessions(sessionsList);
          } catch (err) {
            setSessions([]);

            if (err instanceof z.ZodError) {
              setError(new ValidationError(err));
            } else if (err instanceof Error) {
              setError(err);
            } else {
              setError(new Error('Failed to validate session data.'));
            }
          }
        },
        onError({ error: err }) {
          setSessions([]);
          setError(err);
        },
        onResponse() {
          isFirstLoad.current = false;
          setIsLoading(false);
          setIsRefreshing(false);
        },
      },
    });
  }, []);

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  return {
    sessions,
    error,
    isLoading,
    isRefreshing,
    refresh: loadSessions,
  };
}
