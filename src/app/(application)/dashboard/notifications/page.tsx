import type { Metadata } from 'next';

import NotificationInbox from '@/features/notifications/components/notification-inbox';
import {
  getUnreadInAppNotificationCount,
  getUnreadInAppNotifications,
} from '@/features/notifications/dal';
import { getCurrentUserOrRedirect } from '@/lib/auth/session';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Notifications',
  description: 'View alerts and notifications from your monitors.',
  noIndex: true,
});

export default async function Page() {
  const user = await getCurrentUserOrRedirect();

  const [notifications, unreadCount] = await Promise.all([
    getUnreadInAppNotifications(user.id),
    getUnreadInAppNotificationCount(user.id),
  ]);

  return <NotificationInbox notifications={notifications} unreadCount={unreadCount} />;
}
