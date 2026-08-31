import type { Prisma } from '@/../prisma/generated/client';

import { emailChannelConfigSchema } from './schema';

interface ResolveNotificationChannelsInput {
  tx: Prisma.TransactionClient;
  monitorId: string;
}

export async function resolveNotificationChannels({
  monitorId,
  tx,
}: ResolveNotificationChannelsInput) {
  const channels = await tx.notificationChannel.findMany({
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
