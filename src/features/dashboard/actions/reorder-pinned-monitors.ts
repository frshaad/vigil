import { z } from 'zod';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';

const MAX_PINNED_MONITORS = 5;

const reorderPinnedMonitorsSchema = z.object({
  monitorIds: z.array(z.string().min(1)).min(1).max(MAX_PINNED_MONITORS),
});

export const reorderPinnedMonitors = authClient
  .metadata({ actionName: 'reorderPinnedMonitors' })
  .inputSchema(reorderPinnedMonitorsSchema)
  .action(async ({ ctx, parsedInput }) => {
    const userId = ctx.auth.user.id;
    const { monitorIds } = parsedInput;

    const uniqueMonitorIds = new Set(monitorIds);

    if (uniqueMonitorIds.size !== monitorIds.length) {
      throw new Error('Duplicate monitor IDs are not allowed.');
    }

    const preferences = await prisma.monitorPreference.findMany({
      where: {
        userId,
        monitorId: {
          in: monitorIds,
        },
        isPinned: true,
      },
      select: {
        monitorId: true,
      },
    });

    if (preferences.length !== monitorIds.length) {
      throw new Error('Invalid pinned monitor list.');
    }

    const pinnedMonitorIds = new Set(preferences.map((preference) => preference.monitorId));

    if (monitorIds.some((monitorId) => !pinnedMonitorIds.has(monitorId))) {
      throw new Error('Invalid pinned monitor list.');
    }

    await prisma.$transaction(
      monitorIds.map((monitorId, position) =>
        prisma.monitorPreference.update({
          where: {
            monitorId,
          },
          data: {
            position,
          },
        }),
      ),
    );
  });
