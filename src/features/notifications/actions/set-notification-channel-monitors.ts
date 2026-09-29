'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

import { setNotificationChannelMonitorsSchema } from '../channels/schema';

export const setNotificationChannelMonitors = authClient
  .metadata({ actionName: 'setNotificationChannelMonitors' })
  .inputSchema(setNotificationChannelMonitorsSchema)
  .action(async ({ ctx, parsedInput }) => {
    const userId = ctx.auth.user.id;

    const channel = await prisma.notificationChannel.findFirst({
      where: {
        id: parsedInput.channelId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!channel) {
      throw new Error('Notification channel not found.');
    }

    const monitorIds = [...new Set(parsedInput.monitorIds)];

    if (monitorIds.length > 0) {
      const monitorCount = await prisma.monitor.count({
        where: {
          userId,
          id: {
            in: monitorIds,
          },
        },
      });

      if (monitorCount !== monitorIds.length) {
        throw new Error('One or more monitors are invalid.');
      }
    }

    await prisma.notificationChannel.update({
      where: {
        id: channel.id,
      },
      data: {
        monitors: {
          set: monitorIds.map((id) => ({ id })),
        },
      },
    });

    revalidatePath('/dashboard/notifications');
    revalidatePath('/dashboard/monitors');
  });
