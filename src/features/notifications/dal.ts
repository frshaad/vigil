import prisma from '@/lib/prisma';

const IN_APP_NOTIFICATION_LIMIT = 50;

export async function getNotificationChannels(userId: string) {
  return prisma.notificationChannel.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      type: true,
      name: true,
      config: true,
      isEnabled: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          monitors: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}

export type NotificationChannel = Awaited<ReturnType<typeof getNotificationChannels>>[number];

export async function createInAppNotification({
  userId,
  monitorId,
  type,
  title,
  message,
}: {
  userId: string;
  monitorId?: string;
  type: 'MONITOR_DOWN' | 'MONITOR_RECOVERED';
  title: string;
  message: string;
}) {
  return prisma.inAppNotification.create({
    data: {
      userId,
      monitorId,
      type,
      title,
      message,
    },
  });
}

export async function getInAppNotifications(userId: string) {
  return prisma.inAppNotification.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      type: true,
      title: true,
      message: true,
      readAt: true,
      createdAt: true,
      monitorId: true,
      monitor: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: IN_APP_NOTIFICATION_LIMIT,
  });
}

export type InAppNotification = Awaited<ReturnType<typeof getInAppNotifications>>[number];

export async function getUnreadInAppNotificationCount(userId: string) {
  return prisma.inAppNotification.count({
    where: {
      userId,
      readAt: null,
    },
  });
}

export async function markInAppNotificationAsRead(userId: string, notificationId: string) {
  return prisma.inAppNotification.updateMany({
    where: {
      id: notificationId,
      userId,
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  });
}

export async function markAllInAppNotificationsAsRead(userId: string) {
  return prisma.inAppNotification.updateMany({
    where: {
      userId,
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  });
}
