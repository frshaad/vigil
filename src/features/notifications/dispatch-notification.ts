import prisma from '@/lib/prisma';

import { resolveNotificationChannels } from './channels/resolve-notification-channels';
import { sendEmailNotification } from './email/send-email-notification';
import type { NotificationEvent } from './events';
import { sendTelegramNotification } from './telegram/send-telegram-notification';

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
    console.error(`Notification skipped: monitor ${event.monitorId} not found.`);
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
    console.error(`Notification skipped: incident ${event.incidentId} not found.`);
    return;
  }

  const channels = await resolveNotificationChannels(event.monitorId);

  if (channels.length === 0) {
    return;
  }

  const results = await Promise.allSettled(
    channels.map((channel) => {
      if (channel.type === 'EMAIL') {
        return sendEmailNotification({
          event,
          email: channel.email,
          monitorName: monitor.name,
          monitorUrl: monitor.url,
          statusCode: incident.statusCode,
          error: incident.error,
          startedAt: incident.startedAt,
          resolvedAt: incident.resolvedAt,
        });
      }

      return sendTelegramNotification({
        event,
        chatId: channel.chatId,
        monitorName: monitor.name,
        monitorUrl: monitor.url,
        statusCode: incident.statusCode,
        error: incident.error,
        startedAt: incident.startedAt,
        resolvedAt: incident.resolvedAt,
      });
    })
  );

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(
        `Failed to send notification through channel ${channels[index].id}.`,
        result.reason
      );
    }
  });
}
