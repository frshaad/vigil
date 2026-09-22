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
    // ---------------------------------------------------------------------------
    // Subscription
    // ---------------------------------------------------------------------------

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

    // ---------------------------------------------------------------------------
    // Notification channels
    // ---------------------------------------------------------------------------

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

    // ---------------------------------------------------------------------------
    // Monitors
    // ---------------------------------------------------------------------------

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

    // ---------------------------------------------------------------------------
    // Dashboard monitor preferences
    // ---------------------------------------------------------------------------

    // Reset demo preferences so repeated seeds stay deterministic.
    await tx.monitorPreference.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await tx.monitorPreference.createMany({
      data: [
        {
          userId: user.id,
          monitorId: website.id,
          isPinned: true,
          position: 0,
        },
        {
          userId: user.id,
          monitorId: api.id,
          isPinned: true,
          position: 1,
        },
      ],
    });

    // ---------------------------------------------------------------------------
    // Monitor checks
    // ---------------------------------------------------------------------------

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

    // ---------------------------------------------------------------------------
    // Incidents
    // ---------------------------------------------------------------------------

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

    // ---------------------------------------------------------------------------
    // In-app notifications
    // ---------------------------------------------------------------------------

    // Reset demo notifications so every seed produces a predictable inbox.
    await tx.inAppNotification.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await tx.inAppNotification.createMany({
      data: [
        // Recent unread notification
        {
          userId: user.id,
          monitorId: api.id,
          type: 'MONITOR_DOWN',
          title: 'Production API is down',
          message: 'Gateway timeout. The monitor returned HTTP 504.',
          readAt: null,
          createdAt: demoTime(18),
        },

        // Recent unread notification
        {
          userId: user.id,
          monitorId: website.id,
          type: 'MONITOR_RECOVERED',
          title: 'Marketing Website recovered',
          message: 'The monitor is responding normally again with HTTP 200.',
          readAt: null,
          createdAt: demoTime(95),
        },

        // Unread but older
        {
          userId: user.id,
          monitorId: api.id,
          type: 'MONITOR_RECOVERED',
          title: 'Production API recovered',
          message: 'The monitor is responding again with HTTP 200.',
          readAt: null,
          createdAt: demoTime(60 * 8),
        },

        // Read notification
        {
          userId: user.id,
          monitorId: api.id,
          type: 'MONITOR_DOWN',
          title: 'Production API went down',
          message: 'Internal server error. The monitor returned HTTP 500.',
          readAt: demoTime(60 * 8 - 15),
          createdAt: demoTime(60 * 8 + 20),
        },

        // Read notification
        {
          userId: user.id,
          monitorId: website.id,
          type: 'MONITOR_RECOVERED',
          title: 'Marketing Website recovered',
          message: 'The monitor recovered after a temporary bad gateway response.',
          readAt: demoTime(3 * 24 * 60),
          createdAt: demoTime(6 * 24 * 60 + 3),
        },

        // Read notification
        {
          userId: user.id,
          monitorId: website.id,
          type: 'MONITOR_DOWN',
          title: 'Marketing Website is down',
          message: 'Service temporarily unavailable. The monitor returned HTTP 503.',
          readAt: demoTime(13 * 24 * 60),
          createdAt: demoTime(14 * 24 * 60),
        },

        // Read notification
        {
          userId: user.id,
          monitorId: website.id,
          type: 'MONITOR_RECOVERED',
          title: 'Marketing Website recovered',
          message: 'The monitor recovered and is responding with HTTP 200.',
          readAt: demoTime(13 * 24 * 60 - 10),
          createdAt: demoTime(14 * 24 * 60 - 8),
        },

        // Older read notification
        {
          userId: user.id,
          monitorId: api.id,
          type: 'MONITOR_RECOVERED',
          title: 'Production API recovered',
          message: 'The monitor recovered after an internal server error.',
          readAt: demoTime(3 * 24 * 60 - 20),
          createdAt: demoTime(3 * 24 * 60 - 10),
        },

        // Another older read notification
        {
          userId: user.id,
          monitorId: website.id,
          type: 'MONITOR_DOWN',
          title: 'Marketing Website is down',
          message: 'The monitor detected a temporary service interruption.',
          readAt: demoTime(20 * 24 * 60),
          createdAt: demoTime(21 * 24 * 60),
        },
      ],
    });
  });

  console.log('Demo user seeded successfully.');
  console.log(`Email: ${DEMO_EMAIL}`);
  console.log(`Password: ${DEMO_PASSWORD}`);
  console.log('Monitors: 3');
  console.log('Monitor checks: 132');
  console.log('Incidents: 4');
  console.log('Notification channels: 2');
  console.log('In-app notifications: 9');
  console.log('Pinned monitors: 2');
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
