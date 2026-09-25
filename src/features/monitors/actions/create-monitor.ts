'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { after } from 'next/server';

import { runMonitorCheck } from '@/features/monitoring/run-monitor-check';
import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

import { monitorsTag, monitorTag } from '../cache';
import { createMonitorSchema } from '../schema';

export const createMonitor = authClient
  .metadata({ actionName: 'createMonitor' })
  .inputSchema(createMonitorSchema)
  .action(async ({ ctx, parsedInput }) => {
    const userId = ctx.auth.user.id;

    const monitor = await prisma.monitor.create({
      data: {
        userId,
        name: parsedInput.name,
        url: parsedInput.url,
        method: parsedInput.method,
      },
      select: { id: true },
    });

    updateTag(monitorsTag(userId));

    after(async () => {
      try {
        await runMonitorCheck({ monitorId: monitor.id, userId });

        updateTag(monitorTag(userId, monitor.id));
        updateTag(monitorsTag(userId));

        revalidatePath('/dashboard');
        revalidatePath(`/dashboard/monitors/${monitor.id}`);
        revalidatePath('/dashboard/notifications');
      } catch (error) {
        console.error('Initial monitor check failed:', {
          monitorId: monitor.id,
          error,
        });
      }
    });

    return { id: monitor.id };
  });
