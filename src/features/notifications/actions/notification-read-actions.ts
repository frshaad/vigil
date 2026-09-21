'use server';

import { z } from 'zod';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

const notificationIdSchema = z.object({
  notificationId: z.string().min(1),
});

export const markInAppNotificationAsRead = authClient
  .metadata({
    actionName: 'markInAppNotificationAsRead',
  })
  .inputSchema(notificationIdSchema)
  .action(async ({ ctx, parsedInput }) => {
    const userId = ctx.auth.user.id;
    const { notificationId } = parsedInput;

    await prisma.inAppNotification.updateMany({
      where: {
        id: notificationId,
        userId,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });
  });

export const markAllInAppNotificationsAsRead = authClient
  .metadata({
    actionName: 'markAllInAppNotificationsAsRead',
  })
  .action(async ({ ctx }) => {
    const userId = ctx.auth.user.id;

    await prisma.inAppNotification.updateMany({
      where: {
        userId,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });
  });
