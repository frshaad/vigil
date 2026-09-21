import prisma from '@/lib/prisma';

import { resolveNotificationChannels } from './channels/resolve-notification-channels';
import { createInAppNotification } from './dal';
import { sendEmailNotification } from './email/send-email-notification';
import type { NotificationEvent } from './events';
import { sendTelegramNotification } from './telegram/send-telegram-notification';

export async function dispatchNotification(event: NotificationEvent): Promise<void> {
  const [monitor, incident, channels] = await Promise.all([
    prisma.monitor.findUnique({
      where: {
        id: event.monitorId,
      },
      select: {
        userId: true,
        name: true,
        url: true,
      },
    }),

    prisma.incident.findUnique({
      where: {
        id: event.incidentId,
      },
      select: {
        startedAt: true,
        resolvedAt: true,
        statusCode: true,
        error: true,
      },
    }),

    resolveNotificationChannels(event.monitorId),
  ]);

  if (!monitor) {
    console.error(`Notification skipped: monitor ${event.monitorId} not found.`);
    return;
  }

  if (!incident) {
    console.error(`Notification skipped: incident ${event.incidentId} not found.`);
    return;
  }

  const inAppContent =
    event.type === 'MONITOR_DOWN'
      ? {
          title: `${monitor.name} is down`,
          message:
            incident.error ??
            (incident.statusCode
              ? `The monitor returned HTTP ${incident.statusCode}.`
              : 'The monitor is not responding.'),
        }
      : {
          title: `${monitor.name} recovered`,
          message: incident.statusCode
            ? `The monitor is responding again with HTTP ${incident.statusCode}.`
            : 'The monitor is responding again.',
        };

  const deliveryChannels = channels.filter(
    (channel) => channel.type === 'EMAIL' || channel.type === 'TELEGRAM',
  );

  const results = await Promise.allSettled([
    createInAppNotification({
      userId: monitor.userId,
      monitorId: event.monitorId,
      type: event.type,
      title: inAppContent.title,
      message: inAppContent.message,
    }),

    ...deliveryChannels.map((channel) => {
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
    }),
  ]);

  if (results[0]?.status === 'rejected') {
    console.error(
      `Failed to create in-app notification for monitor ${event.monitorId}.`,
      results[0].reason,
    );
  }

  deliveryChannels.forEach((channel, index) => {
    const result = results[index + 1];

    if (result?.status === 'rejected') {
      console.error(`Failed to send notification through channel ${channel.id}.`, result.reason);
    }
  });
}
