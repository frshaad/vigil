import prisma from '@/lib/prisma';

import { checkMonitor } from './checker/check-monitor';
import { MONITOR_MANUAL_CHECK_COOLDOWN_MS } from './checker/constants';
import { monitorCheckResultSchema } from './checker/schema';
import type { MonitorCheckResult } from './checker/schema';

const MANUAL_CHECK_COOLDOWN_SECONDS = MONITOR_MANUAL_CHECK_COOLDOWN_MS / 1000;

interface RunMonitorCheckInput {
  monitorId: string;
  userId: string;
}

export class MonitorCheckCooldownError extends Error {
  constructor(public readonly retryAfterSeconds: number) {
    super('Monitor was checked too recently.');
  }
}

function checkMonitorCooldown(lastCheckedAt: Date | null) {
  if (lastCheckedAt) {
    const elapsedSeconds = (Date.now() - lastCheckedAt.getTime()) / 1000;

    if (elapsedSeconds < MANUAL_CHECK_COOLDOWN_SECONDS) {
      const retryAfterSeconds = Math.ceil(MANUAL_CHECK_COOLDOWN_SECONDS - elapsedSeconds);

      throw new MonitorCheckCooldownError(retryAfterSeconds);
    }
  }
}

export async function runMonitorCheck({
  monitorId,
  userId,
}: RunMonitorCheckInput): Promise<MonitorCheckResult> {
  const monitor = await prisma.monitor.findFirst({
    where: { id: monitorId, userId },
    select: { id: true, url: true, method: true, lastCheckedAt: true },
  });

  if (!monitor) {
    throw new Error('Monitor not found.');
  }

  checkMonitorCooldown(monitor.lastCheckedAt);

  const result = await checkMonitor({ method: monitor.method, url: monitor.url });

  const validatedResult = monitorCheckResultSchema.parse(result);

  await prisma.monitor.update({
    where: { id: monitor.id },
    data: {
      lastCheckedAt: new Date(),
      lastStatus: validatedResult.status,
      lastStatusCode: validatedResult.statusCode,
      lastResponseTimeMs: validatedResult.responseTimeMs,
    },
  });

  return validatedResult;
}
