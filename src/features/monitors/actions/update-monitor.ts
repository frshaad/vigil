'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

import { updateMonitorSchema } from '../schema/monitor';

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

    revalidatePath('/dashboard/monitors');
    revalidatePath(`/dashboard/monitors/${parsedInput.id}`);

    return {
      id: parsedInput.id,
    };
  });
