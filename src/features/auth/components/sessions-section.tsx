'use client';

import { IconPointFilled, IconRefresh } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { useRevokeAllSessions } from '../hooks/use-revoke-all-sessions';
import { useRevokeOtherSessions } from '../hooks/use-revoke-other-sessions';
import { useSessions } from '../hooks/use-sessions';
import SessionContent from './session-content';

export default function SessionsSection() {
  const router = useRouter();

  const sessionData = useSessions();
  const { sessions, isRefreshing, refresh: refetch } = sessionData;

  const { revokeOtherSessions, isPending: isRevokingOthers } = useRevokeOtherSessions({
    onRevoked: refetch,
  });

  const { revokeAllSessions, isPending: isRevokingAll } = useRevokeAllSessions({
    onRevoked: async () => {
      router.replace('/login');
    },
  });

  const isBulkActionPending = isRevokingOthers || isRevokingAll;

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-lg font-medium">
            <h2>Active sessions</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Review and manage where your account is signed in.
          </p>
        </div>

        <Button variant="outline" className="cursor-auto" type="button" disabled>
          {isRefreshing ? (
            <IconRefresh className="text-muted-foreground animate-spin" />
          ) : (
            <IconPointFilled className="animate-pulse text-green-500" />
          )}
          {sessions.length} active session{sessions.length === 1 ? '' : 's'}
        </Button>
      </div>

      <div className="space-y-2">
        <SessionContent sessionsData={sessionData} />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variant="destructive"
          className="sm:flex-1"
          type="button"
          onClick={() => void revokeOtherSessions()}
          disabled={isBulkActionPending || sessions.length <= 1}
        >
          Sign out other devices
        </Button>

        <Button
          variant="destructive"
          className="sm:flex-1"
          type="button"
          onClick={() => void revokeAllSessions()}
          disabled={isBulkActionPending || sessions.length === 0}
        >
          Sign out all sessions
        </Button>
      </div>
    </section>
  );
}
