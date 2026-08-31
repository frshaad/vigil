import z from 'zod';

export const emailChannelConfigSchema = z.object({
  email: z.email(),
});

export type EmailChannelConfig = z.infer<typeof emailChannelConfigSchema>;
