import prisma from '@/lib/prisma';

import { emailChannelConfigSchema, telegramChannelConfigSchema } from './schema';

type ResolvedNotificationChannel =
  | {
      id: string;
      type: 'EMAIL';
      email: string;
    }
  | {
      id: string;
      type: 'TELEGRAM';
      chatId: string;
    };

export async function resolveNotificationChannels(
  monitorId: string,
): Promise<ResolvedNotificationChannel[]> {
  const channels = await prisma.notificationChannel.findMany({
    where: {
      isEnabled: true,
      monitors: {
        some: {
          id: monitorId,
        },
      },
    },
    select: {
      id: true,
      type: true,
      config: true,
    },
  });

  const resolvedChannels: ResolvedNotificationChannel[] = [];

  for (const channel of channels) {
    if (channel.type === 'EMAIL') {
      const config = emailChannelConfigSchema.safeParse(channel.config);

      if (!config.success) {
        console.error(`Invalid email notification config for channel ${channel.id}.`);
        continue;
      }

      resolvedChannels.push({
        id: channel.id,
        type: channel.type,
        email: config.data.email,
      });

      continue;
    }

    if (channel.type === 'TELEGRAM') {
      const config = telegramChannelConfigSchema.safeParse(channel.config);

      if (!config.success) {
        console.error(`Invalid Telegram notification config for channel ${channel.id}.`);
        continue;
      }

      resolvedChannels.push({
        id: channel.id,
        type: channel.type,
        chatId: config.data.chatId,
      });
    }
  }

  return resolvedChannels;
}
