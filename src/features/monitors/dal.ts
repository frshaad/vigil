import { cacheLife, cacheTag } from 'next/cache';

import type { Monitor, Prisma } from '@/../prisma/generated/client';
import prisma from '@/lib/prisma';

import { monitorTag, monitorsTag } from './cache';

export const monitorDetailsSelect = {
  id: true,
  name: true,
  url: true,
  method: true,
  intervalSeconds: true,
  isActive: true,
  lastCheckedAt: true,
  lastStatus: true,
  lastStatusCode: true,
  lastResponseTimeMs: true,
  createdAt: true,
  updatedAt: true,

  incidents: {
    orderBy: {
      startedAt: 'desc',
    },
    take: 5,
    select: {
      id: true,
      startedAt: true,
      resolvedAt: true,
      status: true,
      statusCode: true,
      error: true,
    },
  },
} satisfies Prisma.MonitorSelect;

export type MonitorDetails = Prisma.MonitorGetPayload<{
  select: typeof monitorDetailsSelect;
}>;

export async function getMonitor(monitorId: Monitor['id'], userId: Monitor['userId']) {
  'use cache';

  cacheLife('minutes');
  cacheTag(monitorTag(userId, monitorId));

  return await prisma.monitor.findFirst({
    where: { id: monitorId, userId },
    select: monitorDetailsSelect,
  });
}

export async function getUserMonitors(userId: Monitor['userId']) {
  'use cache';

  cacheLife('minutes');
  cacheTag(monitorsTag(userId));

  return await prisma.monitor.findMany({
    where: { userId },
    select: monitorDetailsSelect,
    orderBy: { createdAt: 'desc' },
  });
}
