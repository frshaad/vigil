'use server';

import { z } from 'zod';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

const toggleNotificationChannelSchema = z.object({
  channelId: z.string().min(1),
  isEnabled: z.boolean(),
});

export const toggleNotificationChannel = authClient
  .metadata({
    actionName: 'toggleNotificationChannel',
  })
  .inputSchema(toggleNotificationChannelSchema)
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

    return prisma.notificationChannel.update({
      where: {
        id: channel.id,
      },
      data: {
        isEnabled: parsedInput.isEnabled,
      },
      select: {
        id: true,
        isEnabled: true,
      },
    });
  });
