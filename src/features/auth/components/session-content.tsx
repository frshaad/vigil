'use client';

import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';

import { useCurrentSessionToken } from '../hooks/use-current-session-token';
import { useRevokeSession } from '../hooks/use-revoke-session';
import type { useSessions } from '../hooks/use-sessions';
import type { SessionInfo } from '../schemas/session';
import SessionItem from './session-item';
import SessionItemSkeleton from './session-item-skeleton';

interface SessionContentProps {
  sessions: ReturnType<typeof useSessions>;
}

export default function SessionContent({ sessions }: SessionContentProps) {
  const { sessionsState, refetch } = sessions;

  const { revokeSession, pendingToken } = useRevokeSession({
    onRevoked: refetch,
  });

  const currentSessionToken = useCurrentSessionToken();

  if (sessionsState.status === 'loading') {
    return <SessionItemSkeleton />;
  }

  if (sessionsState.status === 'error') {
    return (
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Couldn't load your sessions</ItemTitle>
          <ItemDescription>Please try again.</ItemDescription>
        </ItemContent>

        <ItemActions>
          <Button onClick={refetch}>Retry</Button>
        </ItemActions>
      </Item>
    );
  }

  if (sessionsState.sessions.length === 0) {
    <div className="text-muted-foreground rounded-xl border p-6 text-sm">
      You are only signed in on this device.
    </div>;
  }

  const currentSessionInfo = sessionsState.sessions.find(
    (session) => session.token === currentSessionToken
  ) as SessionInfo;

  return (
    <div className="space-y-2">
      <SessionItem
        key={currentSessionInfo.id}
        session={currentSessionInfo}
        isCurrent={true}
        isPending={false}
        onRevoke={revokeSession}
      />
      {sessionsState.sessions
        .filter((session) => session.token !== currentSessionToken)
        .map((session) => {
          const isPending = session.token === pendingToken;

          return (
            <SessionItem
              key={session.id}
              session={session}
              isCurrent={false}
              isPending={isPending}
              onRevoke={revokeSession}
            />
          );
        })}
    </div>
  );
}
