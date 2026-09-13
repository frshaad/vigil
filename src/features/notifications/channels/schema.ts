import z from 'zod';

export const emailChannelConfigSchema = z.object({
  email: z.email(),
});

export const telegramChannelConfigSchema = z.object({
  botToken: z.string().min(1),
  chatId: z.string().min(1),
});

export const inAppChannelConfigSchema = z.object({});

export const createNotificationChannelSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('EMAIL'),
    name: z.string().trim().min(1).max(50),
    config: emailChannelConfigSchema,
  }),

  z.object({
    type: z.literal('TELEGRAM'),
    name: z.string().trim().min(1).max(50),
    config: telegramChannelConfigSchema,
  }),

  z.object({
    type: z.literal('IN_APP'),
    name: z.string().trim().min(1).max(50),
    config: inAppChannelConfigSchema,
  }),
]);

export type EmailChannelConfig = z.infer<typeof emailChannelConfigSchema>;
export type TelegramChannelConfig = z.infer<typeof telegramChannelConfigSchema>;
