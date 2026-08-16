import { cacheLife, cacheTag } from 'next/cache';

import type { Monitor } from '@/../prisma/generated/client';
import prisma from '@/lib/prisma';

import { monitorTag, monitorsTag } from './cache';

const monitorSelect = {
  id: true,
  name: true,
  url: true,
  method: true,
  isActive: true,
} satisfies Partial<Record<keyof Monitor, true>>;

export async function getMonitor(monitorId: Monitor['id'], userId: Monitor['userId']) {
  'use cache';

  cacheLife('minutes');
  cacheTag(monitorTag(userId, monitorId));

  return await prisma.monitor.findFirst({
    where: { id: monitorId, userId },
    select: monitorSelect,
  });
}

export async function getUserMonitors(userId: Monitor['userId']) {
  'use cache';

  cacheLife('minutes');
  cacheTag(monitorsTag(userId));

  return await prisma.monitor.findMany({
    where: { userId },
    select: monitorSelect,
    orderBy: { createdAt: 'desc' },
  });
}
