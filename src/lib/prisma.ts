import { PrismaNeon } from '@prisma/adapter-neon';

import { env } from '@/env';

import { PrismaClient } from '../../prisma/generated/client';

const adapter = new PrismaNeon({ connectionString: env.DATABASE_URL });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
