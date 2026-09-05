import { env } from '@/env';

import type { NotificationEvent } from '../events';

interface SendTelegramNotificationInput {
  event: NotificationEvent;
  chatId: string;
  monitorName: string;
  monitorUrl: string;
  statusCode: number | null;
  error: string | null;
  startedAt: Date;
  resolvedAt: Date | null;
}

export async function sendTelegramNotification({
  event,
  chatId,
  monitorName,
  monitorUrl,
  statusCode,
  error,
  startedAt,
  resolvedAt,
}: SendTelegramNotificationInput): Promise<void> {
  const botToken = env.TELEGRAM_BOT_TOKEN;

  const isDown = event.type === 'MONITOR_DOWN';

  const message = [
    `${isDown ? '🔴 Monitor down' : '🟢 Monitor recovered'}: ${monitorName}`,
    '',
    `URL: ${monitorUrl}`,
    statusCode !== null && `HTTP: ${statusCode}`,
    error !== null && `Error: ${error}`,
    `Started: ${startedAt.toISOString()}`,
    resolvedAt !== null && `Recovered: ${resolvedAt.toISOString()}`,
  ]
    .filter(Boolean)
    .join('\n');

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram request failed with status ${response.status}.`);
  }
}
