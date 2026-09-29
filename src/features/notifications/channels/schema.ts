import { z } from 'zod';

export const emailChannelConfigSchema = z.object({
  email: z.email(),
});

export const createNotificationChannelSchema = z.object({
  name: z.string().trim().min(1).max(50),
  config: emailChannelConfigSchema,
});

export type EmailChannelConfig = z.infer<typeof emailChannelConfigSchema>;
