'use server';

import { updateTag } from 'next/cache';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

import { monitorsTag } from '../cache';
import { createMonitorSchema } from '../schema';

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

    updateTag(monitorsTag(ctx.auth.user.id));

    return { id: monitor.id };
  });
