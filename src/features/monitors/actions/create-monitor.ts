'use server';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

import { createMonitorSchema } from '../schema/monitor';

export const createMonitor = authClient
  .metadata({ actionName: 'createMonitor' })
  .inputSchema(createMonitorSchema)
  .action(async ({ ctx, parsedInput }) => {
    const monitor = await prisma.monitor.create({
      data: {
        userId: ctx.auth.user.id,
        name: parsedInput.name,
        url: parsedInput.url,
        method: parsedInput.method,
      },
      select: { id: true },
    });

    return { id: monitor.id };
  });
