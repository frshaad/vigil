import { getCurrentUserOrRedirect } from '@/lib/auth/session';

import { getUnreadInAppNotificationCount, getUnreadInAppNotifications } from '../dal';
import NotificationBellClient from './notification-bell-client';

export default async function NotificationBell() {
  const user = await getCurrentUserOrRedirect();

  const [notifications, unreadCount] = await Promise.all([
    getUnreadInAppNotifications(user.id),
    getUnreadInAppNotificationCount(user.id),
  ]);

  return (
    <NotificationBellClient
      initialNotifications={notifications.map((notification) => ({
        id: notification.id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        monitorId: notification.monitorId,
        createdAt: notification.createdAt.toISOString(),
      }))}
      initialUnreadCount={unreadCount}
    />
  );
}
