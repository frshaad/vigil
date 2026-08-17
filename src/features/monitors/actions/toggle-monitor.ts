'use server';

import { updateTag } from 'next/cache';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

import { monitorsTag, monitorTag } from '../cache';
import { toggleMonitorSchema } from '../schema';

export const toggleMonitor = authClient
  .metadata({ actionName: 'toggleMonitor' })
  .inputSchema(toggleMonitorSchema)
  .action(async ({ ctx, parsedInput }) => {
    const monitor = await prisma.monitor.updateMany({
      where: {
        id: parsedInput.id,
        userId: ctx.auth.user.id,
      },
      data: {
        isActive: parsedInput.isActive,
      },
    });

    if (monitor.count === 0) {
      throw new Error('Monitor not found.');
    }

    updateTag(monitorsTag(ctx.auth.user.id));
    updateTag(monitorTag(ctx.auth.user.id, parsedInput.id));

    return {
      id: parsedInput.id,
      isActive: parsedInput.isActive,
    };
  });
