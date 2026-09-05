import { sendEmail } from '@/features/email/send-email';

import type { NotificationEvent } from '../events';
import MonitorNotificationEmail from './monitor-notification-email';

interface SendEmailNotificationInput {
  event: NotificationEvent;
  monitorName: string;
  monitorUrl: string;
  email: string;
  statusCode: number | null;
  error: string | null;
  startedAt?: Date;
  resolvedAt?: Date | null;
}

export async function sendEmailNotification({
  event,
  email,
  monitorName,
  monitorUrl,
  statusCode,
  error,
  startedAt,
  resolvedAt,
}: SendEmailNotificationInput) {
  const isDown = event.type === 'MONITOR_DOWN';

  await sendEmail({
    to: email,
    subject: isDown ? `Monitor down: ${monitorName}` : `Monitor recovered: ${monitorName}`,
    react: MonitorNotificationEmail({
      event,
      monitorName,
      monitorUrl,
      statusCode,
      error,
      startedAt,
      resolvedAt,
    }),
  });
}
