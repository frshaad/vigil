import type { NotificationChannel } from '../dal';
import CreateNotificationChannel from './create-notification-channel';
import NotificationChannelList from './notification-channel-list';

interface NotificationsPageProps {
  channels: NotificationChannel[];
}

export default function NotificationsPage({ channels }: NotificationsPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>

          <p className="text-muted-foreground mt-1 text-sm">
            Manage how Vigil sends alerts for your monitors.
          </p>
        </div>

        <CreateNotificationChannel />
      </div>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-medium">Notification channels</h2>

          <p className="text-muted-foreground text-sm">
            Channels can be assigned to individual monitors.
          </p>
        </div>

        <NotificationChannelList channels={channels} />
      </section>
    </div>
  );
}
