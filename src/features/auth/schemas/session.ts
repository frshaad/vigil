import z from 'zod';

export const sessionInfoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  expiresAt: z.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
});

export type SessionInfo = z.infer<typeof sessionInfoSchema>;
