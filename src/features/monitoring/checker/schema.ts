import z from 'zod';

import { MonitorStatus } from '@/../prisma/generated/enums';

export const monitorCheckStatusSchema = z.enum([MonitorStatus.UP, MonitorStatus.DOWN]);

export const monitorCheckResultSchema = z.object({
  status: monitorCheckStatusSchema,
  statusCode: z.number().int().min(100).max(599).nullable(),
  responseTimeMs: z.number().int().nonnegative().nullable(),
  error: z.string().nullable(),
});

export type MonitorCheckResult = z.infer<typeof monitorCheckResultSchema>;
