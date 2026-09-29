import prisma from '@/lib/prisma';

export async function resolveNotificationChannels(monitorId: string) {
  return prisma.notificationChannel.findMany({
    where: {
      isEnabled: true,
      monitors: {
        some: {
          id: monitorId,
        },
      },
    },
    select: {
      id: true,
      email: true,
    },
  });
}

export type ResolvedNotificationChannel = Awaited<
  ReturnType<typeof resolveNotificationChannels>
>[number];
