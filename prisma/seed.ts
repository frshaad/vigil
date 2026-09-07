import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const DEMO_EMAIL = 'demo@vigil.dev';
const DEMO_PASSWORD = 'DemoPassword123!';

const DAY_MS = 24 * 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

function demoTime(minutesAgo: number) {
  return new Date(Date.now() - minutesAgo * MINUTE_MS);
}

async function getOrCreateDemoUser() {
  const existingUser = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });

  if (existingUser) {
    return existingUser;
  }

  const result = await auth.api.signUpEmail({
    body: {
      name: 'Demo User',
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    },
  });

  return result.user;
}

async function main() {
  const user = await getOrCreateDemoUser();

  await prisma.$transaction(async (tx) => {
    // Subscription
    await tx.subscription.upsert({
      where: {
        userId: user.id,
      },
      update: {
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * DAY_MS),
      },
      create: {
        userId: user.id,
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * DAY_MS),
      },
    });

    // Notification channels
    const emailChannel = await tx.notificationChannel.upsert({
      where: {
        id: 'demo-email-channel',
      },
      update: {
        userId: user.id,
        type: 'EMAIL',
        name: 'Email',
        config: {
          email: DEMO_EMAIL,
        },
        isEnabled: true,
      },
      create: {
        id: 'demo-email-channel',
        userId: user.id,
        type: 'EMAIL',
        name: 'Email',
        config: {
          email: DEMO_EMAIL,
        },
        isEnabled: true,
      },
    });

    const telegramChannel = await tx.notificationChannel.upsert({
      where: {
        id: 'demo-telegram-channel',
      },
      update: {
        userId: user.id,
        type: 'TELEGRAM',
        name: 'Telegram',
        config: {
          chatId: '123456789',
        },
        isEnabled: true,
      },
      create: {
        id: 'demo-telegram-channel',
        userId: user.id,
        type: 'TELEGRAM',
        name: 'Telegram',
        config: {
          chatId: '123456789',
        },
        isEnabled: true,
      },
    });

    // Monitors
    const website = await tx.monitor.upsert({
      where: {
        id: 'demo-monitor-website',
      },
      update: {
        userId: user.id,
        name: 'Marketing Website',
        url: 'https://vigil.dev',
        method: 'GET',
        intervalSeconds: 60,
        isActive: true,
        lastCheckedAt: demoTime(1),
        lastStatus: 'UP',
        lastStatusCode: 200,
        lastResponseTimeMs: 142,
        notificationChannels: {
          set: [{ id: emailChannel.id }, { id: telegramChannel.id }],
        },
      },
      create: {
        id: 'demo-monitor-website',
        userId: user.id,
        name: 'Marketing Website',
        url: 'https://vigil.dev',
        method: 'GET',
        intervalSeconds: 60,
        isActive: true,
        lastCheckedAt: demoTime(1),
        lastStatus: 'UP',
        lastStatusCode: 200,
        lastResponseTimeMs: 142,
        notificationChannels: {
          connect: [{ id: emailChannel.id }, { id: telegramChannel.id }],
        },
      },
    });

    const api = await tx.monitor.upsert({
      where: {
        id: 'demo-monitor-api',
      },
      update: {
        userId: user.id,
        name: 'Production API',
        url: 'https://api.vigil.dev/health',
        method: 'GET',
        intervalSeconds: 60,
        isActive: true,
        lastCheckedAt: demoTime(1),
        lastStatus: 'UP',
        lastStatusCode: 200,
        lastResponseTimeMs: 87,
        notificationChannels: {
          set: [{ id: emailChannel.id }],
        },
      },
      create: {
        id: 'demo-monitor-api',
        userId: user.id,
        name: 'Production API',
        url: 'https://api.vigil.dev/health',
        method: 'GET',
        intervalSeconds: 60,
        isActive: true,
        lastCheckedAt: demoTime(1),
        lastStatus: 'UP',
        lastStatusCode: 200,
        lastResponseTimeMs: 87,
        notificationChannels: {
          connect: [{ id: emailChannel.id }],
        },
      },
    });

    const docs = await tx.monitor.upsert({
      where: {
        id: 'demo-monitor-docs',
      },
      update: {
        userId: user.id,
        name: 'Documentation',
        url: 'https://docs.vigil.dev',
        method: 'GET',
        intervalSeconds: 300,
        isActive: false,
        lastCheckedAt: demoTime(120),
        lastStatus: 'UNKNOWN',
        lastStatusCode: null,
        lastResponseTimeMs: null,
        notificationChannels: {
          set: [],
        },
      },
      create: {
        id: 'demo-monitor-docs',
        userId: user.id,
        name: 'Documentation',
        url: 'https://docs.vigil.dev',
        method: 'GET',
        intervalSeconds: 300,
        isActive: false,
        lastCheckedAt: demoTime(120),
        lastStatus: 'UNKNOWN',
        lastStatusCode: null,
        lastResponseTimeMs: null,
      },
    });

    const monitorIds = [website.id, api.id, docs.id];

    // Re-seed demo history.
    await tx.monitorCheck.deleteMany({
      where: {
        monitorId: {
          in: monitorIds,
        },
      },
    });

    const websiteChecks = Array.from({ length: 60 }, (_, index) => {
      const minutesAgo = 59 - index;

      return {
        monitorId: website.id,
        checkedAt: demoTime(minutesAgo),
        status: 'UP' as const,
        statusCode: 200,
        responseTimeMs: index % 17 === 0 ? 280 : 115 + ((index * 7) % 45),
        error: null,
      };
    });

    const apiChecks = Array.from({ length: 60 }, (_, index) => {
      const minutesAgo = 59 - index;

      const isDown = index === 24 || index === 25;

      return {
        monitorId: api.id,
        checkedAt: demoTime(minutesAgo),
        status: isDown ? ('DOWN' as const) : ('UP' as const),
        statusCode: isDown ? 504 : 200,
        responseTimeMs: isDown ? 5000 : 70 + ((index * 5) % 35),
        error: isDown ? 'Gateway timeout' : null,
      };
    });

    const docsChecks = Array.from({ length: 12 }, (_, index) => ({
      monitorId: docs.id,
      checkedAt: demoTime(110 - index * 10),
      status: 'UNKNOWN' as const,
      statusCode: null,
      responseTimeMs: null,
      error: null,
    }));

    await tx.monitorCheck.createMany({
      data: [...websiteChecks, ...apiChecks, ...docsChecks],
    });

    // Re-seed demo incidents.
    await tx.incident.deleteMany({
      where: {
        monitorId: {
          in: monitorIds,
        },
      },
    });

    await tx.incident.createMany({
      data: [
        {
          monitorId: website.id,
          startedAt: new Date(Date.now() - 14 * DAY_MS),
          resolvedAt: new Date(Date.now() - 14 * DAY_MS + 8 * MINUTE_MS),
          status: 'RESOLVED',
          statusCode: 503,
          error: 'Service temporarily unavailable',
        },
        {
          monitorId: website.id,
          startedAt: new Date(Date.now() - 6 * DAY_MS),
          resolvedAt: new Date(Date.now() - 6 * DAY_MS + 3 * MINUTE_MS),
          status: 'RESOLVED',
          statusCode: 502,
          error: 'Bad gateway',
        },
        {
          monitorId: api.id,
          startedAt: new Date(Date.now() - 3 * DAY_MS),
          resolvedAt: new Date(Date.now() - 3 * DAY_MS + 11 * MINUTE_MS),
          status: 'RESOLVED',
          statusCode: 500,
          error: 'Internal server error',
        },
        {
          monitorId: api.id,
          startedAt: new Date(Date.now() - DAY_MS),
          resolvedAt: null,
          status: 'OPEN',
          statusCode: 504,
          error: 'Gateway timeout',
        },
      ],
    });
  });

  console.log('Demo user seeded successfully.');
  console.log(`Email: ${DEMO_EMAIL}`);
  console.log(`Password: ${DEMO_PASSWORD}`);
  console.log('Monitors: 3');
  console.log('Monitor checks: 132');
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
