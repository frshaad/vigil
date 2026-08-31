import { z } from 'zod';

export const notificationEventSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('MONITOR_DOWN'),
    monitorId: z.string(),
    incidentId: z.string(),
  }),

  z.object({
    type: z.literal('MONITOR_RECOVERED'),
    monitorId: z.string(),
    incidentId: z.string(),
  }),
]);

export type NotificationEvent = z.infer<typeof notificationEventSchema>;
