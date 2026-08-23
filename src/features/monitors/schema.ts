import z from 'zod';

import { MonitorMethod } from '@/../prisma/generated/enums';

const monitorIdSchema = z.string().min(1);
const monitorNameSchema = z
  .string()
  .trim()
  .min(1, 'Monitor name is required.')
  .max(80, 'Monitor name must be 80 characters or less.');

const monitorUrlSchema = z.httpUrl({
  error: 'Monitor URL must use HTTP or HTTPS.',
  normalize: true,
});

const monitorMethodSchema = z.enum(MonitorMethod);

export const createMonitorSchema = z.object({
  name: monitorNameSchema,
  url: monitorUrlSchema,
  method: monitorMethodSchema.default('GET'),
});

export const updateMonitorSchema = createMonitorSchema.extend({
  id: monitorIdSchema,
});

export const deleteMonitorSchema = z.object({
  id: monitorIdSchema,
});

export const toggleMonitorSchema = z.object({
  id: monitorIdSchema,
  isActive: z.boolean(),
});

export const checkMonitorSchema = z.object({
  id: monitorIdSchema,
});

export type CreateMonitorInput = z.infer<typeof createMonitorSchema>;
export type UpdateMonitorInput = z.infer<typeof updateMonitorSchema>;
export type DeleteMonitorInput = z.infer<typeof deleteMonitorSchema>;
export type ToggleMonitorInput = z.infer<typeof toggleMonitorSchema>;
