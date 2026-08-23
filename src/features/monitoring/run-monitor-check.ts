import prisma from '@/lib/prisma';

import { checkMonitor } from './checker/check-monitor';
import { monitorCheckResultSchema } from './checker/schema';
import type { MonitorCheckResult } from './checker/schema';

interface RunMonitorCheckInput {
  monitorId: string;
  userId: string;
}

export async function runMonitorCheck({
  monitorId,
  userId,
}: RunMonitorCheckInput): Promise<MonitorCheckResult> {
  const monitor = await prisma.monitor.findFirst({
    where: { id: monitorId, userId },
    select: { id: true, url: true, method: true },
  });

  if (!monitor) {
    throw new Error('Monitor not found.');
  }

  const result = await checkMonitor({ method: monitor.method, url: monitor.url });

  const validatedResult = monitorCheckResultSchema.parse(result);

  await prisma.monitor.update({
    where: { id: monitorId },
    data: {
      lastCheckedAt: new Date(),
      lastStatus: validatedResult.status,
      lastStatusCode: validatedResult.statusCode,
      lastResponseTimeMs: validatedResult.responseTimeMs,
    },
  });

  return validatedResult;
}
