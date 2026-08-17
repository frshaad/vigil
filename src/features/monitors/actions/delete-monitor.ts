'use server';

import { updateTag } from 'next/cache';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

import { monitorsTag } from '../cache';
import { deleteMonitorSchema } from '../schema';

export const deleteMonitor = authClient
  .metadata({ actionName: 'deleteMonitor' })
  .inputSchema(deleteMonitorSchema)
  .action(async ({ ctx, parsedInput }) => {
    const result = await prisma.monitor.deleteMany({
      where: {
        id: parsedInput.id,
        userId: ctx.auth.user.id,
      },
    });

    if (result.count === 0) {
      throw new Error('Monitor not found.');
    }

    updateTag(monitorsTag(ctx.auth.user.id));

    return {
      id: parsedInput.id,
    };
  });
