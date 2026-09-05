import z from 'zod';

export const emailChannelConfigSchema = z.object({
  email: z.email(),
});

export const telegramChannelConfigSchema = z.object({
  chatId: z.string().min(1),
});

export type EmailChannelConfig = z.infer<typeof emailChannelConfigSchema>;
export type TelegramChannelConfig = z.infer<typeof telegramChannelConfigSchema>;
