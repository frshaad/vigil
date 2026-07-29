'use client';

import { IconDevices2, IconPointFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { useRevokeAllSessions } from '../hooks/use-revoke-all-sessions';
import { useRevokeOtherSessions } from '../hooks/use-revoke-other-sessions';
import { useSessions } from '../hooks/use-sessions';
import SessionContent from './session-content';

export default function SessionsSection() {
  const router = useRouter();

  const sessions = useSessions();
  const { state, refetch } = sessions;

  const { revokeOtherSessions, isPending: isRevokingOthers } = useRevokeOtherSessions({
    onRevoked: refetch,
  });

  const { revokeAllSessions, isPending: isRevokingAll } = useRevokeAllSessions({
    onRevoked: async () => {
      await refetch();
      router.replace('/login');
    },
  });

  const isBulkActionPending = isRevokingOthers || isRevokingAll;
  const activeSessionsCount = state.status === 'success' ? state.sessions.length : 0;

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-lg font-medium">
            <IconDevices2 />
            <h2>Active sessions</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Review and manage where your account is signed in.
          </p>
        </div>

        <Button variant="outline" className="cursor-auto" type="button" disabled>
          <IconPointFilled className="animate-pulse text-green-500" />
          {activeSessionsCount} active session{activeSessionsCount === 1 ? '' : 's'}
        </Button>
      </div>

      <div className="space-y-2">
        <SessionContent sessions={sessions} />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variant="destructive"
          className="flex-1"
          type="button"
          onClick={() => void revokeOtherSessions()}
          disabled={isBulkActionPending || activeSessionsCount <= 1}
        >
          Sign out other devices
        </Button>

        <Button
          variant="destructive"
          className="flex-1"
          type="button"
          onClick={() => void revokeAllSessions()}
          disabled={isBulkActionPending || activeSessionsCount === 0}
        >
          Sign out all sessions
        </Button>
      </div>
    </section>
  );
}
