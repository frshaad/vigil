import prisma from '@/lib/prisma';

export async function getDashboardMetrics(userId: string) {
  const [total, up, down, paused] = await Promise.all([
    prisma.monitor.count({
      where: { userId },
    }),

    prisma.monitor.count({
      where: {
        userId,
        isActive: true,
        lastStatus: 'UP',
      },
    }),

    prisma.monitor.count({
      where: {
        userId,
        isActive: true,
        lastStatus: 'DOWN',
      },
    }),

    prisma.monitor.count({
      where: {
        userId,
        isActive: false,
      },
    }),
  ]);

  return {
    total,
    up,
    down,
    paused,
  };
}

export async function getDashboardMonitors(userId: string) {
  return prisma.monitor.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      url: true,
      method: true,
      isActive: true,
      lastStatus: true,
      lastCheckedAt: true,
      lastStatusCode: true,
      lastResponseTimeMs: true,
      intervalSeconds: true,
      monitorPreference: {
        select: {
          isPinned: true,
          position: true,
        },
      },
    },
  });
}

export async function getDashboardIncidents(userId: string) {
  return prisma.incident.findMany({
    where: {
      status: 'OPEN',
      monitor: {
        userId,
      },
    },
    select: {
      id: true,
      startedAt: true,
      statusCode: true,
      error: true,
      monitor: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      startedAt: 'desc',
    },
    take: 5,
  });
}

export async function getDashboardRecentActivity(userId: string) {
  return prisma.incident.findMany({
    where: {
      monitor: {
        userId,
      },
    },
    select: {
      id: true,
      startedAt: true,
      resolvedAt: true,
      status: true,
      statusCode: true,
      error: true,
      monitor: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 6,
  });
}

export type DashboardMonitor = Awaited<ReturnType<typeof getDashboardMonitors>>[number];
