import type { MonitorCheck } from '@/../prisma/generated/client';
import type { MonitorCheckSelect } from '@/../prisma/generated/models';
import prisma from '@/lib/prisma';

export type MonitorCheckSummary = Omit<MonitorCheck, 'monitorId'>;

const monitorCheckSelect = {
  id: true,
  checkedAt: true,
  status: true,
  statusCode: true,
  responseTimeMs: true,
  error: true,
} satisfies MonitorCheckSelect;

interface FetchOptions {
  limit?: number;
  order?: 'asc' | 'desc';
}

async function fetchMonitorChecks(
  monitorId: string,
  options: FetchOptions = {},
): Promise<MonitorCheckSummary[]> {
  const { limit = 10, order = 'desc' } = options;

  const checks = await prisma.monitorCheck.findMany({
    where: { monitorId },
    select: monitorCheckSelect,
    orderBy: { checkedAt: 'desc' },
    take: limit,
  });

  return order === 'asc' ? checks.reverse() : checks;
}

const HISTORY_LIMIT = 100;
const RECENT_CHECKS_LIMIT = 10;

export async function getMonitorCheckHistory(monitorId: string): Promise<MonitorCheckSummary[]> {
  return fetchMonitorChecks(monitorId, {
    limit: HISTORY_LIMIT,
    order: 'asc',
  });
}

export async function getRecentMonitorChecks(monitorId: string): Promise<MonitorCheckSummary[]> {
  return fetchMonitorChecks(monitorId, {
    limit: RECENT_CHECKS_LIMIT,
    order: 'desc',
  });
}
