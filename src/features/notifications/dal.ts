import prisma from '@/lib/prisma';

export async function getNotificationChannels(userId: string) {
  return prisma.notificationChannel.findMany({
    where: { userId },
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

export async function getUnreadInAppNotifications(userId: string) {
  return prisma.inAppNotification.findMany({
    where: {
      userId,
      readAt: null,
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
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50,
  });
}

export async function getUnreadInAppNotificationCount(userId: string) {
  return prisma.inAppNotification.count({
    where: {
      userId,
      readAt: null,
    },
  });
}

export type UnreadInAppNotification = Awaited<
  ReturnType<typeof getUnreadInAppNotifications>
>[number];
