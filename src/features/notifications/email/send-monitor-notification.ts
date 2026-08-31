import { sendEmail } from '@/features/email/send-email';
import ResetPasswordEmail from '@/features/email/templates/reset-password-email';

import type { NotificationEvent } from '../events';

interface SendMonitorNotificationInput {
  event: NotificationEvent;
  monitorName: string;
  monitorUrl: string;
  email: string;
}

export async function sendMonitorNotification({
  email,
  event,
  monitorName,
  monitorUrl: _a,
}: SendMonitorNotificationInput) {
  const isDown = event.type === 'MONITOR_DOWN';

  await sendEmail({
    to: email,
    subject: isDown ? `Monitor down: ${monitorName}` : `Monitor recovered: ${monitorName}`,
    react: ResetPasswordEmail({ resetUrl: '' }),
  });
}
