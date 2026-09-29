import { z } from 'zod';

export const emailChannelConfigSchema = z.object({
  email: z.email(),
});

export const createNotificationChannelSchema = z.object({
  name: z.string().trim().min(1).max(50),
  config: emailChannelConfigSchema,
});

export const setMonitorNotificationChannelsSchema = z.object({
  monitorId: z.string(),
  channelIds: z.array(z.string()).max(10),
});

export const setNotificationChannelMonitorsSchema = z.object({
  channelId: z.string(),
  monitorIds: z.array(z.string()).max(100),
});

export type EmailChannelConfig = z.infer<typeof emailChannelConfigSchema>;
