'use client';

import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';

import { useCurrentSessionToken } from '../hooks/use-current-session-token';
import { useRevokeSession } from '../hooks/use-revoke-session';
import type { useSessions } from '../hooks/use-sessions';
import SessionItem from './session-item';
import SessionItemSkeleton from './session-item-skeleton';

interface SessionContentProps {
  sessionsData: ReturnType<typeof useSessions>;
}

export default function SessionContent({ sessionsData }: SessionContentProps) {
  const { sessions, error, isLoading, refresh } = sessionsData;

  const currentSessionToken = useCurrentSessionToken();

  const { revokeSession, pendingToken } = useRevokeSession({
    onRevoked: refresh,
  });

  function handleRevokeSession(token: string) {
    void revokeSession(token);
  }

  if (isLoading) {
    return <SessionItemSkeleton />;
  }

  if (error !== null) {
    return (
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>We couldn't load your active sessions.</ItemTitle>
          <ItemDescription>This doesn't affect your current login.</ItemDescription>
        </ItemContent>

        <ItemActions>
          <Button onClick={() => void refresh()}>Retry</Button>
        </ItemActions>
      </Item>
    );
  }

  const currentSessionInfo = sessions.find((s) => s.token === currentSessionToken);

  return (
    <div className="space-y-2">
      {currentSessionInfo !== undefined && (
        <SessionItem
          key={currentSessionInfo.id}
          session={currentSessionInfo}
          isCurrent={true}
          isPending={false}
          onRevoke={handleRevokeSession}
        />
      )}

      {sessions
        .filter((session) => session.token !== currentSessionToken)
        .map((session) => {
          const isPending = session.token === pendingToken;

          return (
            <SessionItem
              key={session.id}
              session={session}
              isCurrent={false}
              isPending={isPending}
              onRevoke={handleRevokeSession}
            />
          );
        })}
    </div>
  );
}
