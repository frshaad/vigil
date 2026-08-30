import type { Prisma } from '@/../prisma/generated/client';
import type { MonitorStatus } from '@/../prisma/generated/enums';

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
}: HandleMonitorStatusInput) {
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

    if (!openIncident) {
      await tx.incident.create({
        data: {
          monitorId,
          startedAt: now,
          statusCode,
          error,
        },
      });
    }

    return;
  }

  if (recovered) {
    await tx.incident.updateMany({
      where: {
        monitorId,
        status: 'OPEN',
      },
      data: { status: 'RESOLVED', resolvedAt: now },
    });
  }
}
