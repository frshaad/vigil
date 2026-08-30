import { Prisma } from '@/../prisma/generated/client';
import prisma from '@/lib/prisma';

import { checkMonitor } from './checker/check-monitor';
import { MONITOR_MANUAL_CHECK_COOLDOWN_MS } from './checker/constants';
import { monitorCheckResultSchema } from './checker/schema';
import { getManualCheckCooldownRemaining } from './checker/utils';
import { handleMonitorStatus } from './incidents/handle-monitor-status';

interface RunMonitorCheckInput {
  monitorId: string;
  userId: string;
}

export class MonitorCheckCooldownError extends Error {
  constructor(public readonly retryAfterSeconds: number) {
    super('Monitor was checked too recently.');
  }
}

async function claimMonitorCheck(monitorId: string, userId: string, now: Date) {
  const cooldownThreshold = new Date(now.getTime() - MONITOR_MANUAL_CHECK_COOLDOWN_MS);

  const result = await prisma.monitor.updateMany({
    where: {
      id: monitorId,
      userId,
      OR: [
        { lastCheckedAt: null },
        {
          lastCheckedAt: { lte: cooldownThreshold },
        },
      ],
    },
    data: {
      lastCheckedAt: now,
    },
  });

  if (result.count === 1) {
    return;
  }

  const monitor = await prisma.monitor.findFirst({
    where: {
      id: monitorId,
      userId,
    },
    select: {
      lastCheckedAt: true,
    },
  });

  if (!monitor) {
    throw new Error('Monitor not found.');
  }

  const retryAfterSeconds = getManualCheckCooldownRemaining(monitor.lastCheckedAt, new Date());

  throw new MonitorCheckCooldownError(retryAfterSeconds);
}

async function persistMonitorCheck(
  monitorId: string,
  result: ReturnType<typeof monitorCheckResultSchema.parse>,
  checkedAt: Date
) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      // oxlint-disable-next-line no-await-in-loop -- Retries must run sequentially.
      return await prisma.$transaction(
        async (tx) => {
          const monitor = await tx.monitor.findUnique({
            where: {
              id: monitorId,
            },
            select: {
              lastStatus: true,
            },
          });

          if (!monitor) {
            throw new Error('Monitor not found.');
          }

          await tx.monitor.update({
            where: {
              id: monitorId,
            },
            data: {
              lastCheckedAt: checkedAt,
              lastStatus: result.status,
              lastStatusCode: result.statusCode,
              lastResponseTimeMs: result.responseTimeMs,
            },
          });

          await handleMonitorStatus({
            tx,
            monitorId,
            previousStatus: monitor.lastStatus,
            nextStatus: result.status,
            statusCode: result.statusCode,
            error: result.error,
            now: checkedAt,
          });

          return result;
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        }
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2034' &&
        attempt < 2
      ) {
        continue;
      }

      throw error;
    }
  }

  throw new Error('Failed to persist monitor check.');
}

export async function runMonitorCheck({ monitorId, userId }: RunMonitorCheckInput) {
  const checkStartedAt = new Date();

  await claimMonitorCheck(monitorId, userId, checkStartedAt);

  const monitor = await prisma.monitor.findFirst({
    where: {
      id: monitorId,
      userId,
    },
    select: {
      url: true,
      method: true,
    },
  });

  if (!monitor) {
    throw new Error('Monitor not found.');
  }

  const rawResult = await checkMonitor(monitor.url, monitor.method);

  const result = monitorCheckResultSchema.parse(rawResult);

  const checkedAt = new Date();

  return await persistMonitorCheck(monitorId, result, checkedAt);
}
