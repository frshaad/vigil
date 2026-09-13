'use server';

import { z } from 'zod';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

const deleteNotificationChannelSchema = z.object({
  channelId: z.string().min(1),
});

export const deleteNotificationChannel = authClient
  .metadata({
    actionName: 'deleteNotificationChannel',
  })
  .inputSchema(deleteNotificationChannelSchema)
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

    await prisma.notificationChannel.delete({
      where: {
        id: channel.id,
      },
    });
  });
