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

  const tasks: Promise<unknown>[] = [];

  for (const channel of channels) {
    if (channel.type === 'EMAIL') {
      tasks.push(
        sendEmailNotification({
          event,
          email: channel.email,
          monitorName: monitor.name,
          monitorUrl: monitor.url,
          statusCode: incident.statusCode,
          error: incident.error,
          startedAt: incident.startedAt,
          resolvedAt: incident.resolvedAt,
        }),
      );

      continue;
    }

    tasks.push(
      sendTelegramNotification({
        event,
        chatId: channel.chatId,
        monitorName: monitor.name,
        monitorUrl: monitor.url,
        statusCode: incident.statusCode,
        error: incident.error,
        startedAt: incident.startedAt,
        resolvedAt: incident.resolvedAt,
      }),
    );
  }

  const inAppChannel = await prisma.notificationChannel.findFirst({
    where: {
      userId: monitor.userId,
      type: 'IN_APP',
      isEnabled: true,
    },
    select: {
      id: true,
    },
  });

  if (inAppChannel) {
    const isDown = event.type === 'MONITOR_DOWN';

    tasks.push(
      createInAppNotification({
        userId: monitor.userId,
        type: isDown ? 'MONITOR_DOWN' : 'MONITOR_RECOVERED',
        title: isDown ? `${monitor.name} is down` : `${monitor.name} recovered`,
        message: isDown
          ? incident.statusCode
            ? `The monitor returned HTTP ${incident.statusCode}.`
            : (incident.error ?? 'The monitor check failed.')
          : 'The monitor is back up.',
      }),
    );
  }

  if (tasks.length === 0) {
    return;
  }

  const results = await Promise.allSettled(tasks);

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Failed to send notification task at index ${index}.`, result.reason);
    }
  });
}
