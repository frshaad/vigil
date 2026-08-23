'use server';

import { updateTag } from 'next/cache';

import { runMonitorCheck } from '@/features/monitoring/run-monitor-check';
import { authClient } from '@/lib/safe-action';

import { monitorsTag, monitorTag } from '../cache';
import { checkMonitorSchema } from '../schema';

export const checkMonitor = authClient
  .metadata({ actionName: 'checkMonitor' })
  .inputSchema(checkMonitorSchema)
  .action(async ({ ctx, parsedInput }) => {
    const result = await runMonitorCheck({
      monitorId: parsedInput.id,
      userId: ctx.auth.user.id,
    });

    updateTag(monitorTag(ctx.auth.user.id, parsedInput.id));
    updateTag(monitorsTag(ctx.auth.user.id));

    return result;
  });
