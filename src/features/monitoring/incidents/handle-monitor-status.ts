import type { Prisma } from '@/../prisma/generated/client';
import type { MonitorStatus } from '@/../prisma/generated/enums';
import type { NotificationEvent } from '@/features/notifications/events';

interface HandleMonitorStatusInput {
  tx: Prisma.TransactionClient;
  monitorId: string;
  previousStatus: MonitorStatus;
  nextStatus: MonitorStatus;
  statusCode: number | null;
  error: string | null;
  now: Date;
}

export async function handleMonitorStatus({
  tx,
  monitorId,
  previousStatus,
  nextStatus,
  statusCode,
  error,
  now,
}: HandleMonitorStatusInput): Promise<NotificationEvent | null> {
  const wentDown = previousStatus !== 'DOWN' && nextStatus === 'DOWN';
  const recovered = previousStatus === 'DOWN' && nextStatus === 'UP';

  if (wentDown) {
    const openIncident = await tx.incident.findFirst({
      where: {
        monitorId,
        status: 'OPEN',
      },
      select: {
        id: true,
      },
    });

    if (openIncident) {
      return null;
    }

    const incident = await tx.incident.create({
      data: {
        monitorId,
        startedAt: now,
        statusCode,
        error,
      },
      select: {
        id: true,
      },
    });

    return {
      type: 'MONITOR_DOWN',
      monitorId,
      incidentId: incident.id,
    };
  }

  if (recovered) {
    const result = await tx.incident.updateMany({
      where: {
        monitorId,
        status: 'OPEN',
      },
      data: {
        status: 'RESOLVED',
        resolvedAt: now,
      },
    });

    if (result.count === 0) {
      return null;
    }

    const incident = await tx.incident.findFirst({
      where: {
        monitorId,
        status: 'RESOLVED',
        resolvedAt: now,
      },
      orderBy: {
        resolvedAt: 'desc',
      },
      select: {
        id: true,
      },
    });

    if (!incident) {
      return null;
    }

    return {
      type: 'MONITOR_RECOVERED',
      monitorId,
      incidentId: incident.id,
    };
  }

  return null;
}
