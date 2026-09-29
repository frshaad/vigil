import { IconBellOff } from '@tabler/icons-react';

import type { Monitor } from '@/../prisma/generated/client';
import { Card, CardContent } from '@/components/ui/card';

import type { NotificationChannel } from '../dal';
import NotificationChannelCard from './notification-channel-card';

interface NotificationChannelListProps {
  channels: NotificationChannel[];
  monitors: Pick<Monitor, 'id' | 'name' | 'isActive'>[];
}

export default function NotificationChannelList({
  channels,
  monitors,
}: NotificationChannelListProps) {
  if (channels.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted flex size-10 items-center justify-center rounded-full">
            <IconBellOff className="text-muted-foreground size-5" />
          </div>

          <h3 className="mt-4 text-sm font-medium">No email notifications</h3>

          <p className="text-muted-foreground mt-1 max-w-sm text-sm">
            Add an email address to receive monitor alerts outside Vigil.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {channels.map((channel) => (
        <NotificationChannelCard key={channel.id} channel={channel} monitors={monitors} />
      ))}
    </div>
  );
}
