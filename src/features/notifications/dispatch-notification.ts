import prisma from '@/lib/prisma';

import { resolveNotificationChannels } from './channels/resolve-notification-channels';
import { sendMonitorNotification } from './email/send-monitor-notification';
import type { NotificationEvent } from './events';

export async function dispatchNotification(event: NotificationEvent): Promise<void> {
  const monitor = await prisma.monitor.findUnique({
    where: {
      id: event.monitorId,
    },
    select: {
      name: true,
      url: true,
    },
  });

  if (!monitor) {
    return;
  }

  const channels = await resolveNotificationChannels(event.monitorId);

  if (channels.length === 0) {
    return;
  }

  const incident = await prisma.incident.findUnique({
    where: {
      id: event.incidentId,
    },
    select: {
      startedAt: true,
      resolvedAt: true,
      statusCode: true,
      error: true,
    },
  });

  if (!incident) {
    return;
  }

  await Promise.all(
    channels.map((channel) =>
      sendMonitorNotification({
        event,
        email: channel.email,
        monitorName: monitor.name,
        monitorUrl: monitor.url,
        statusCode: incident.statusCode,
        error: incident.error,
        startedAt: incident.startedAt,
        resolvedAt: incident.resolvedAt,
      })
    )
  );
}
