import z from 'zod';

import { MonitorMethod } from '@/../prisma/generated/enums';

const monitorNameSchema = z
  .string()
  .trim()
  .min(1, 'Monitor name is required.')
  .max(80, 'Monitor name must be 80 characters or less.');

const monitorUrlSchema = z.url({
  protocol: /^https?$/,
  error: 'Monitor URL must use HTTP or HTTPS.',
});

const monitorMethodSchema = z.enum(MonitorMethod);

export const createMonitorSchema = z.object({
  name: monitorNameSchema,
  url: monitorUrlSchema,
  method: monitorMethodSchema.default('GET'),
});

export const updateMonitorSchema = createMonitorSchema.extend({
  id: z.string().min(1),
});

export const deleteMonitorSchema = z.object({
  id: z.string().min(1),
});

export const toggleMonitorSchema = z.object({
  id: z.string().min(1),
  isActive: z.boolean(),
});

export type CreateMonitorInput = z.infer<typeof createMonitorSchema>;
export type UpdateMonitorInput = z.infer<typeof updateMonitorSchema>;
export type DeleteMonitorInput = z.infer<typeof deleteMonitorSchema>;
export type ToggleMonitorInput = z.infer<typeof toggleMonitorSchema>;
