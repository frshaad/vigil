import prisma from '@/lib/prisma';

const METRICS_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface MonitorMetrics {
  totalChecks: number;
  availability: number | null;
  averageResponseTimeMs: number | null;
}

export async function getMonitorMetrics(
  monitorId: string,
  now = new Date()
): Promise<MonitorMetrics> {
  const since = new Date(now.getTime() - METRICS_WINDOW_MS);

  const [totalChecks, upChecks, responseTime] = await Promise.all([
    prisma.monitorCheck.count({
      where: {
        monitorId,
        checkedAt: {
          gte: since,
        },
      },
    }),

    prisma.monitorCheck.count({
      where: {
        monitorId,
        checkedAt: {
          gte: since,
        },
        status: 'UP',
      },
    }),

    prisma.monitorCheck.aggregate({
      where: {
        monitorId,
        checkedAt: {
          gte: since,
        },
        responseTimeMs: {
          not: null,
        },
      },
      _avg: {
        responseTimeMs: true,
      },
    }),
  ]);

  return {
    totalChecks,
    availability: totalChecks === 0 ? null : (upChecks / totalChecks) * 100,
    averageResponseTimeMs:
      responseTime._avg.responseTimeMs === null
        ? null
        : Math.round(responseTime._avg.responseTimeMs),
  };
}
