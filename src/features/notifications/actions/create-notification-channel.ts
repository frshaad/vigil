'use server';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

import { createNotificationChannelSchema } from '../channels/schema';

const MAX_NOTIFICATION_CHANNELS = 10;

export const createNotificationChannel = authClient
  .metadata({
    actionName: 'createNotificationChannel',
  })
  .inputSchema(createNotificationChannelSchema)
  .action(async ({ ctx, parsedInput }) => {
    const userId = ctx.auth.user.id;

    const channelCount = await prisma.notificationChannel.count({
      where: { userId },
    });

    if (channelCount >= MAX_NOTIFICATION_CHANNELS) {
      throw new Error(`You can have up to ${MAX_NOTIFICATION_CHANNELS} notification channels.`);
    }

    return prisma.notificationChannel.create({
      data: {
        userId,
        name: parsedInput.name,
        email: parsedInput.config.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isEnabled: true,
      },
    });
  });
