'use client';

import { IconUnlink } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { formatRelativeDate } from '@/lib/helpers/format-relative-date';

import type { SessionInfo } from '../hooks/use-sessions';
import { getDeviceIcon } from '../utils/get-device-icon';
import { parseSessionDevice } from '../utils/session-device';

interface SessionItemProps {
  session: SessionInfo;
  isCurrent: boolean;
  isPending: boolean;
  onRevoke: (token: string) => void;
}

export default function SessionItem({ session, isCurrent, isPending, onRevoke }: SessionItemProps) {
  const deviceInfo = parseSessionDevice(session.userAgent);

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">{getDeviceIcon(deviceInfo.device)}</ItemMedia>

      <ItemContent>
        <ItemTitle className="flex flex-wrap items-center gap-2">
          {deviceInfo.browser} <span>•</span> {deviceInfo.os}
          {isCurrent && <Badge>This device</Badge>}
        </ItemTitle>

        <ItemDescription>IP: {session.ipAddress ?? 'Unknown'}</ItemDescription>
        <ItemDescription>
          {isCurrent ? 'Active now' : `Last active ${formatRelativeDate(session.updatedAt)}`}
        </ItemDescription>
        <ItemDescription>Expires {formatRelativeDate(session.expiresAt)}</ItemDescription>
      </ItemContent>

      {!isCurrent && (
        <ItemActions>
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => onRevoke(session.token)}
            disabled={isPending}
          >
            <IconUnlink />
            Revoke
          </Button>
        </ItemActions>
      )}
    </Item>
  );
}
