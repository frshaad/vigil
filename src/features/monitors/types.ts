import type { Monitor } from '@/../prisma/generated/client';

export type MonitorSettings = Pick<Monitor, 'id' | 'name' | 'url' | 'method'>;
