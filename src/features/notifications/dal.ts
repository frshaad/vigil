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
