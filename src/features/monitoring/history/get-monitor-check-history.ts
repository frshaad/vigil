import type { MonitorCheck } from '@/../prisma/generated/client';
import prisma from '@/lib/prisma';

const HISTORY_LIMIT = 100;

export async function getMonitorCheckHistory(
  monitorId: string
): Promise<Omit<MonitorCheck, 'monitorId'>[]> {
  const checks = await prisma.monitorCheck.findMany({
    where: {
      monitorId,
    },
    select: {
      id: true,
      checkedAt: true,
      status: true,
      statusCode: true,
      responseTimeMs: true,
      error: true,
    },
    orderBy: {
      checkedAt: 'desc',
    },
    take: HISTORY_LIMIT,
  });

  return checks.reverse();
}
