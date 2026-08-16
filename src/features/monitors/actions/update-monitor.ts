'use server';

import { updateTag } from 'next/cache';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

import { monitorTag, monitorsTag } from '../cache';
import { updateMonitorSchema } from '../schema';

export const updateMonitor = authClient
  .metadata({ actionName: 'updateMonitor' })
  .inputSchema(updateMonitorSchema)
  .action(async ({ ctx, parsedInput }) => {
    const monitor = await prisma.monitor.updateMany({
      where: {
        id: parsedInput.id,
        userId: ctx.auth.user.id,
      },
      data: {
        name: parsedInput.name,
        url: parsedInput.url,
        method: parsedInput.method,
      },
    });

    if (monitor.count === 0) {
      throw new Error('Monitor not found.');
    }

    updateTag(monitorTag(ctx.auth.user.id, parsedInput.id));
    updateTag(monitorsTag(ctx.auth.user.id));

    return {
      id: parsedInput.id,
    };
  });
