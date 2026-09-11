import { z } from 'zod';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

const MAX_PINNED_MONITORS = 5;

const toggleMonitorPinSchema = z.object({
  monitorId: z.string().min(1),
  pinned: z.boolean(),
});

export const toggleMonitorPin = authClient
  .metadata({ actionName: 'toggleMonitorPin' })
  .inputSchema(toggleMonitorPinSchema)
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

    if (!parsedInput.pinned) {
      return prisma.monitorPreference.upsert({
        where: {
          monitorId: monitor.id,
        },
        create: {
          userId,
          monitorId: monitor.id,
          isPinned: false,
          position: 0,
        },
        update: {
          isPinned: false,
        },
      });
    }

    const pinnedCount = await prisma.monitorPreference.count({
      where: {
        userId,
        isPinned: true,
      },
    });

    if (pinnedCount >= MAX_PINNED_MONITORS) {
      throw new Error(`You can pin up to ${MAX_PINNED_MONITORS} monitors.`);
    }

    return prisma.monitorPreference.upsert({
      where: {
        monitorId: monitor.id,
      },
      create: {
        userId,
        monitorId: monitor.id,
        isPinned: true,
        position: pinnedCount,
      },
      update: {
        isPinned: true,
        position: pinnedCount,
      },
    });
  });
