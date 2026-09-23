import prisma from '@/lib/prisma';

export async function getUserSubscription(userId: string) {
  return prisma.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
      plan: true,
      status: true,
      currentPeriodStart: true,
      currentPeriodEnd: true,
    },
  });
}

export type UserSubscription = NonNullable<Awaited<ReturnType<typeof getUserSubscription>>>;
