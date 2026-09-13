'use client';

import { IconBrandTelegram, IconDeviceDesktop, IconMail, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

import { deleteNotificationChannel } from '../actions/delete-notification-channel';
import { toggleNotificationChannel } from '../actions/toggle-notification-channel';
import type { NotificationChannel } from '../dal';

interface NotificationChannelCardProps {
  channel: NotificationChannel;
}

function getChannelDescription(type: NotificationChannel['type']) {
  switch (type) {
    case 'EMAIL':
      return 'Receive monitor alerts by email.';

    case 'TELEGRAM':
      return 'Receive monitor alerts in Telegram.';

    case 'IN_APP':
      return 'Receive alerts inside Vigil.';
  }
}

function ChannelIcon({ type }: { type: NotificationChannel['type'] }) {
  return (
    <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md">
      {type === 'EMAIL' ? (
        <IconMail className="size-4" />
      ) : type === 'TELEGRAM' ? (
        <IconBrandTelegram className="size-4" />
      ) : (
        <IconDeviceDesktop className="size-4" />
      )}
    </div>
  );
}

export default function NotificationChannelCard({ channel }: NotificationChannelCardProps) {
  const router = useRouter();

  const [isEnabled, setIsEnabled] = useState(channel.isEnabled);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (checked: boolean) => {
    const previousValue = isEnabled;

    setIsEnabled(checked);

    startTransition(async () => {
      const result = await toggleNotificationChannel({
        channelId: channel.id,
        isEnabled: checked,
      });

      if (result.serverError || result.validationErrors) {
        setIsEnabled(previousValue);
      }
    });
  };

  const handleDelete = () => {
    if (!window.confirm(`Delete the "${channel.name}" notification channel?`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteNotificationChannel({
        channelId: channel.id,
      });

      if (result.serverError || result.validationErrors) {
        return;
      }

      router.refresh();
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <ChannelIcon type={channel.type} />

          <div className="min-w-0">
            <CardTitle className="truncate text-base">{channel.name}</CardTitle>

            <p className="text-muted-foreground mt-1 text-sm">
              {getChannelDescription(channel.type)}
            </p>
          </div>
        </div>

        <Switch
          checked={isEnabled}
          disabled={isPending}
          onCheckedChange={handleToggle}
          aria-label={`Toggle ${channel.name}`}
        />
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-4">
        <p className="text-muted-foreground text-xs">
          Used by {channel._count.monitors} {channel._count.monitors === 1 ? 'monitor' : 'monitors'}
        </p>

        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={handleDelete}
          className="text-destructive hover:text-destructive"
        >
          <IconTrash />
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
