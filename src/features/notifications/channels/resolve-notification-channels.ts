import prisma from '@/lib/prisma';

import { emailChannelConfigSchema } from './schema';

export async function resolveNotificationChannels(monitorId: string) {
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

  return channels.flatMap((channel) => {
    if (channel.type !== 'EMAIL') {
      return [];
    }

    const config = emailChannelConfigSchema.safeParse(channel.config);

    if (!config.success) {
      return [];
    }

    return [
      {
        id: channel.id,
        type: channel.type,
        email: config.data.email,
      },
    ];
  });
}
