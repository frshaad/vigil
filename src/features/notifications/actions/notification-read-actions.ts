'use server';

import { z } from 'zod';

import { authClient } from '@/lib/safe-action';

import {
  markAllInAppNotificationsAsRead as markAllInAppNotificationsAsReadInDb,
  markInAppNotificationAsRead as markInAppNotificationAsReadInDb,
} from '../dal';

const notificationIdSchema = z.object({
  notificationId: z.string().min(1),
});

export const markInAppNotificationAsRead = authClient
  .metadata({
    actionName: 'markInAppNotificationAsRead',
  })
  .inputSchema(notificationIdSchema)
  .action(async ({ ctx, parsedInput }) => {
    await markInAppNotificationAsReadInDb(ctx.auth.user.id, parsedInput.notificationId);
  });

export const markAllInAppNotificationsAsRead = authClient
  .metadata({
    actionName: 'markAllInAppNotificationsAsRead',
  })
  .action(async ({ ctx }) => {
    await markAllInAppNotificationsAsReadInDb(ctx.auth.user.id);
  });
