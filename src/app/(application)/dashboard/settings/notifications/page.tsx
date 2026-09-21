import { IconArrowLeft, IconBell } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CreateNotificationChannel from '@/features/notifications/components/create-notification-channel';
import NotificationChannelList from '@/features/notifications/components/notification-channel-list';
import { getNotificationChannels } from '@/features/notifications/dal';
import { getCurrentUserOrRedirect } from '@/lib/auth/session';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Notification Settings',
  description: 'Manage how Vigil delivers monitor alerts.',
  noIndex: true,
});

export default async function Page() {
  const user = await getCurrentUserOrRedirect();

  const channels = await getNotificationChannels(user.id);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2"
            nativeButton={false}
            render={
              <Link href="/dashboard/notifications">
                <IconArrowLeft />
                Notifications
              </Link>
            }
          />

          <h1 className="text-2xl font-semibold tracking-tight">Notification settings</h1>

          <p className="text-muted-foreground mt-1 text-sm">
            Choose where Vigil should send monitor alerts.
          </p>
        </div>

        <CreateNotificationChannel />
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <IconBell size={18} stroke={1.75} />
            In-app notifications
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground text-sm leading-6">
            In-app notifications are built into Vigil and appear in your notification inbox whenever
            a monitor goes down or recovers.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-medium">Notification channels</h2>

          <p className="text-muted-foreground text-sm">
            Email and Telegram channels can be assigned to individual monitors.
          </p>
        </div>

        <NotificationChannelList channels={channels} />
      </section>
    </div>
  );
}
