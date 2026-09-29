'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

import { setMonitorNotificationChannelsSchema } from '../channels/schema';

export const setMonitorNotificationChannels = authClient
  .metadata({ actionName: 'setMonitorNotificationChannels' })
  .inputSchema(setMonitorNotificationChannelsSchema)
  .action(async ({ ctx, parsedInput }) => {
    const userId = ctx.auth.user.id;

    const monitor = await prisma.monitor.findFirst({
      where: {
        id: parsedInput.monitorId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!monitor) {
      throw new Error('Monitor not found.');
    }

    const channelIds = [...new Set(parsedInput.channelIds)];

    if (channelIds.length > 10) {
      throw new Error('You can connect up to 10 email channels to a monitor.');
    }

    if (channelIds.length > 0) {
      const channelCount = await prisma.notificationChannel.count({
        where: {
          userId,
          id: {
            in: channelIds,
          },
        },
      });

      if (channelCount !== channelIds.length) {
        throw new Error('One or more notification channels are invalid.');
      }
    }

    await prisma.monitor.update({
      where: {
        id: monitor.id,
      },
      data: {
        notificationChannels: {
          set: channelIds.map((id) => ({ id })),
        },
      },
    });

    revalidatePath(`/dashboard/monitors/${monitor.id}`);
    revalidatePath('/dashboard/notifications');
  });
