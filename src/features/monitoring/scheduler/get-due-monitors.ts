import prisma from '@/lib/prisma';

interface DueMonitor {
  id: string;
  userId: string;
}

export async function getDueMonitors(now = new Date()): Promise<DueMonitor[]> {
  const monitors = await prisma.monitor.findMany({
    where: { isActive: true },
    select: {
      id: true,
      userId: true,
      lastCheckedAt: true,
      intervalSeconds: true,
    },
  });

  return monitors
    .filter((monitor) => {
      if (!monitor.lastCheckedAt) {
        return true;
      }

      const nextCheckAt = monitor.lastCheckedAt.getTime() + monitor.intervalSeconds * 1000;

      return nextCheckAt <= now.getTime();
    })
    .map(({ id, userId }) => ({
      id,
      userId,
    }));
}
