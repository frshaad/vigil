import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const DEMO_EMAIL = 'demo@vigil.dev';
const DEMO_PASSWORD = 'DemoPassword123!';

const MINUTE_MS = 60 * 1000;
const DAY_MINUTES = 24 * 60;

const MONITOR_IDS = {
  website: 'demo-monitor-website',
  api: 'demo-monitor-api',
  orders: 'demo-monitor-orders',
  inventory: 'demo-monitor-inventory',
  payments: 'demo-monitor-payments',
  legacy: 'demo-monitor-legacy',
  docs: 'demo-monitor-docs',
} as const;

const CHANNEL_IDS = {
  email: 'demo-email-channel',
  telegram: 'demo-telegram-channel',
  inApp: 'demo-in-app-channel',
  backupEmail: 'demo-backup-email-channel',
} as const;

type MonitorMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
type MonitorStatus = 'UNKNOWN' | 'UP' | 'DOWN';

type DemoMonitorDefinition = {
  id: string;
  name: string;
  url: string;
  method: MonitorMethod;
  intervalSeconds: number;
  isActive: boolean;
  lastCheckedAt: Date | null;
  lastStatus: MonitorStatus;
  lastStatusCode: number | null;
  lastResponseTimeMs: number | null;
  channelIds: string[];
};

type DownWindow = {
  startMinutesAgo: number;
  endMinutesAgo: number;
  statusCode: number;
  responseTimeMs: number;
  error: string;
};

function demoTime(now: Date, minutesAgo: number) {
  return new Date(now.getTime() - minutesAgo * MINUTE_MS);
}

function makeMonitorChecks({
  monitorId,
  now,
  upStatusCode,
  baseResponseTimeMs,
  responseTimeVarianceMs,
  outageWindows = [],
}: {
  monitorId: string;
  now: Date;
  upStatusCode: number;
  baseResponseTimeMs: number;
  responseTimeVarianceMs: number;
  outageWindows?: DownWindow[];
}) {
  return Array.from({ length: 97 }, (_, index) => {
    const minutesAgo = DAY_MINUTES - index * 15;

    const outage = outageWindows.find(
      (window) => minutesAgo <= window.startMinutesAgo && minutesAgo >= window.endMinutesAgo,
    );

    if (outage) {
      return {
        monitorId,
        checkedAt: demoTime(now, minutesAgo),
        status: 'DOWN' as const,
        statusCode: outage.statusCode,
        responseTimeMs: outage.responseTimeMs,
        error: outage.error,
      };
    }

    return {
      monitorId,
      checkedAt: demoTime(now, minutesAgo),
      status: 'UP' as const,
      statusCode: upStatusCode,
      responseTimeMs: baseResponseTimeMs + ((index * 13) % responseTimeVarianceMs),
      error: null,
    };
  });
}

async function getOrCreateDemoUser() {
  const existingUser = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });

  if (existingUser) {
    return prisma.user.update({
      where: { id: existingUser.id },
      data: {
        name: 'Demo User',
        emailVerified: true,
      },
    });
  }

  const result = await auth.api.signUpEmail({
    body: {
      name: 'Demo User',
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    },
  });

  return prisma.user.update({
    where: { id: result.user.id },
    data: {
      emailVerified: true,
    },
  });
}

async function main() {
  const now = new Date();
  const user = await getOrCreateDemoUser();

  await prisma.$transaction(async (tx) => {
    // ---------------------------------------------------------------------------
    // Reset demo data
    // ---------------------------------------------------------------------------

    await tx.inAppNotification.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await tx.monitorPreference.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await tx.monitor.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await tx.notificationChannel.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await tx.subscription.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // ---------------------------------------------------------------------------
    // Subscription
    // ---------------------------------------------------------------------------

    await tx.subscription.create({
      data: {
        userId: user.id,
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodStart: demoTime(now, 14 * DAY_MINUTES),
        currentPeriodEnd: new Date(now.getTime() + 16 * DAY_MINUTES * MINUTE_MS),
      },
    });

    // ---------------------------------------------------------------------------
    // Notification channels
    // ---------------------------------------------------------------------------

    await tx.notificationChannel.create({
      data: {
        id: CHANNEL_IDS.email,
        userId: user.id,
        type: 'EMAIL',
        name: 'Primary Email',
        config: {
          email: DEMO_EMAIL,
        },
        isEnabled: true,
      },
    });

    await tx.notificationChannel.create({
      data: {
        id: CHANNEL_IDS.telegram,
        userId: user.id,
        type: 'TELEGRAM',
        name: 'Telegram Alerts',
        config: {
          chatId: '123456789',
        },
        isEnabled: true,
      },
    });

    await tx.notificationChannel.create({
      data: {
        id: CHANNEL_IDS.inApp,
        userId: user.id,
        type: 'IN_APP',
        name: 'In-app Alerts',
        config: {},
        isEnabled: true,
      },
    });

    await tx.notificationChannel.create({
      data: {
        id: CHANNEL_IDS.backupEmail,
        userId: user.id,
        type: 'EMAIL',
        name: 'Backup Email',
        config: {
          email: 'backup@vigil.dev',
        },
        isEnabled: false,
      },
    });

    // ---------------------------------------------------------------------------
    // Monitors
    // ---------------------------------------------------------------------------

    const monitorDefinitions: DemoMonitorDefinition[] = [
      {
        id: MONITOR_IDS.website,
        name: 'Vigil Website',
        url: 'https://github.com',
        method: 'GET',
        intervalSeconds: 60,
        isActive: true,
        lastCheckedAt: demoTime(now, 1),
        lastStatus: 'UP',
        lastStatusCode: 200,
        lastResponseTimeMs: 142,
        channelIds: [CHANNEL_IDS.email, CHANNEL_IDS.telegram, CHANNEL_IDS.inApp],
      },

      {
        id: MONITOR_IDS.api,
        name: 'Production API',
        url: 'https://api.github.com',
        method: 'GET',
        intervalSeconds: 120,
        isActive: true,
        lastCheckedAt: demoTime(now, 2),
        lastStatus: 'UP',
        lastStatusCode: 200,
        lastResponseTimeMs: 87,
        channelIds: [CHANNEL_IDS.email, CHANNEL_IDS.inApp],
      },

      {
        id: MONITOR_IDS.orders,
        name: 'Orders API',
        url: 'https://httpbin.org/post',
        method: 'POST',
        intervalSeconds: 300,
        isActive: true,
        lastCheckedAt: demoTime(now, 3),
        lastStatus: 'UP',
        lastStatusCode: 201,
        lastResponseTimeMs: 218,
        channelIds: [CHANNEL_IDS.email, CHANNEL_IDS.inApp],
      },

      {
        id: MONITOR_IDS.inventory,
        name: 'Inventory API',
        url: 'https://httpbin.org/patch',
        method: 'PATCH',
        intervalSeconds: 300,
        isActive: true,
        lastCheckedAt: demoTime(now, 4),
        lastStatus: 'UP',
        lastStatusCode: 200,
        lastResponseTimeMs: 164,
        channelIds: [CHANNEL_IDS.email, CHANNEL_IDS.telegram, CHANNEL_IDS.inApp],
      },

      {
        id: MONITOR_IDS.payments,
        name: 'Payments API',
        url: 'https://httpbin.org/status/503',
        method: 'PUT',
        intervalSeconds: 60,
        isActive: true,
        lastCheckedAt: demoTime(now, 1),
        lastStatus: 'DOWN',
        lastStatusCode: 503,
        lastResponseTimeMs: 5000,
        channelIds: [
          CHANNEL_IDS.email,
          CHANNEL_IDS.telegram,
          CHANNEL_IDS.inApp,
          CHANNEL_IDS.backupEmail,
        ],
      },

      {
        id: MONITOR_IDS.legacy,
        name: 'Legacy Admin API',
        url: 'https://httpbin.org/delete',
        method: 'DELETE',
        intervalSeconds: 900,
        isActive: true,
        lastCheckedAt: demoTime(now, 6),
        lastStatus: 'UP',
        lastStatusCode: 204,
        lastResponseTimeMs: 196,
        channelIds: [CHANNEL_IDS.inApp],
      },

      {
        id: MONITOR_IDS.docs,
        name: 'Documentation',
        url: 'https://nextjs.org',
        method: 'GET',
        intervalSeconds: 600,
        isActive: false,
        lastCheckedAt: null,
        lastStatus: 'UNKNOWN',
        lastStatusCode: null,
        lastResponseTimeMs: null,
        channelIds: [],
      },
    ];

    for (const monitor of monitorDefinitions) {
      await tx.monitor.create({
        data: {
          id: monitor.id,
          userId: user.id,
          name: monitor.name,
          url: monitor.url,
          method: monitor.method,
          intervalSeconds: monitor.intervalSeconds,
          isActive: monitor.isActive,
          lastCheckedAt: monitor.lastCheckedAt,
          lastStatus: monitor.lastStatus,
          lastStatusCode: monitor.lastStatusCode,
          lastResponseTimeMs: monitor.lastResponseTimeMs,
          notificationChannels: {
            connect: monitor.channelIds.map((id) => ({ id })),
          },
        },
      });
    }

    // ---------------------------------------------------------------------------
    // Monitor preferences
    // ---------------------------------------------------------------------------

    await tx.monitorPreference.createMany({
      data: [
        {
          userId: user.id,
          monitorId: MONITOR_IDS.website,
          isPinned: true,
          position: 0,
        },
        {
          userId: user.id,
          monitorId: MONITOR_IDS.api,
          isPinned: true,
          position: 1,
        },
        {
          userId: user.id,
          monitorId: MONITOR_IDS.payments,
          isPinned: true,
          position: 2,
        },
        {
          userId: user.id,
          monitorId: MONITOR_IDS.orders,
          isPinned: false,
          position: 0,
        },
        {
          userId: user.id,
          monitorId: MONITOR_IDS.inventory,
          isPinned: false,
          position: 1,
        },
        {
          userId: user.id,
          monitorId: MONITOR_IDS.legacy,
          isPinned: false,
          position: 2,
        },
        {
          userId: user.id,
          monitorId: MONITOR_IDS.docs,
          isPinned: false,
          position: 3,
        },
      ],
    });

    // ---------------------------------------------------------------------------
    // Monitor checks
    // ---------------------------------------------------------------------------

    const websiteChecks = makeMonitorChecks({
      monitorId: MONITOR_IDS.website,
      now,
      upStatusCode: 200,
      baseResponseTimeMs: 110,
      responseTimeVarianceMs: 48,
    });

    const apiChecks = makeMonitorChecks({
      monitorId: MONITOR_IDS.api,
      now,
      upStatusCode: 200,
      baseResponseTimeMs: 65,
      responseTimeVarianceMs: 35,
    });

    const ordersChecks = makeMonitorChecks({
      monitorId: MONITOR_IDS.orders,
      now,
      upStatusCode: 201,
      baseResponseTimeMs: 170,
      responseTimeVarianceMs: 65,
    });

    const inventoryChecks = makeMonitorChecks({
      monitorId: MONITOR_IDS.inventory,
      now,
      upStatusCode: 200,
      baseResponseTimeMs: 120,
      responseTimeVarianceMs: 55,
      outageWindows: [
        {
          startMinutesAgo: 135,
          endMinutesAgo: 120,
          statusCode: 502,
          responseTimeMs: 5000,
          error: 'Bad gateway',
        },
      ],
    });

    const paymentsChecks = makeMonitorChecks({
      monitorId: MONITOR_IDS.payments,
      now,
      upStatusCode: 200,
      baseResponseTimeMs: 135,
      responseTimeVarianceMs: 50,
      outageWindows: [
        {
          startMinutesAgo: 45,
          endMinutesAgo: 0,
          statusCode: 503,
          responseTimeMs: 5000,
          error: 'Service temporarily unavailable',
        },
      ],
    });

    const legacyChecks = makeMonitorChecks({
      monitorId: MONITOR_IDS.legacy,
      now,
      upStatusCode: 204,
      baseResponseTimeMs: 150,
      responseTimeVarianceMs: 70,
    });

    await tx.monitorCheck.createMany({
      data: [
        ...websiteChecks,
        ...apiChecks,
        ...ordersChecks,
        ...inventoryChecks,
        ...paymentsChecks,
        ...legacyChecks,
      ],
    });

    // ---------------------------------------------------------------------------
    // Incidents
    // ---------------------------------------------------------------------------

    await tx.incident.createMany({
      data: [
        // Current open incident
        {
          monitorId: MONITOR_IDS.payments,
          startedAt: demoTime(now, 45),
          resolvedAt: null,
          status: 'OPEN',
          statusCode: 503,
          error: 'Service temporarily unavailable',
        },

        // Recent resolved incident
        {
          monitorId: MONITOR_IDS.inventory,
          startedAt: demoTime(now, 135),
          resolvedAt: demoTime(now, 120),
          status: 'RESOLVED',
          statusCode: 502,
          error: 'Bad gateway',
        },

        // Older resolved incident
        {
          monitorId: MONITOR_IDS.api,
          startedAt: demoTime(now, 8 * 60 + 25),
          resolvedAt: demoTime(now, 8 * 60 + 10),
          status: 'RESOLVED',
          statusCode: 500,
          error: 'Internal server error',
        },

        // Historical website incident
        {
          monitorId: MONITOR_IDS.website,
          startedAt: demoTime(now, 3 * DAY_MINUTES + 20),
          resolvedAt: demoTime(now, 3 * DAY_MINUTES + 8),
          status: 'RESOLVED',
          statusCode: 503,
          error: 'Service temporarily unavailable',
        },

        // Another historical incident
        {
          monitorId: MONITOR_IDS.website,
          startedAt: demoTime(now, 7 * DAY_MINUTES + 15),
          resolvedAt: demoTime(now, 7 * DAY_MINUTES + 5),
          status: 'RESOLVED',
          statusCode: 502,
          error: 'Bad gateway',
        },

        // Legacy API incident
        {
          monitorId: MONITOR_IDS.legacy,
          startedAt: demoTime(now, 10 * DAY_MINUTES + 25),
          resolvedAt: demoTime(now, 10 * DAY_MINUTES + 10),
          status: 'RESOLVED',
          statusCode: 500,
          error: 'Internal server error',
        },
      ],
    });

    // ---------------------------------------------------------------------------
    // In-app notifications
    // ---------------------------------------------------------------------------

    await tx.inAppNotification.createMany({
      data: [
        // Unread - current outage
        {
          userId: user.id,
          monitorId: MONITOR_IDS.payments,
          type: 'MONITOR_DOWN',
          title: 'Payments API is down',
          message: 'Service temporarily unavailable. The monitor returned HTTP 503.',
          readAt: null,
          createdAt: demoTime(now, 20),
        },

        // Unread - recent recovery
        {
          userId: user.id,
          monitorId: MONITOR_IDS.inventory,
          type: 'MONITOR_RECOVERED',
          title: 'Inventory API recovered',
          message: 'The monitor recovered after a brief bad gateway response.',
          readAt: null,
          createdAt: demoTime(now, 118),
        },

        // Read - API recovery
        {
          userId: user.id,
          monitorId: MONITOR_IDS.api,
          type: 'MONITOR_RECOVERED',
          title: 'Production API recovered',
          message: 'The monitor is responding normally again with HTTP 200.',
          readAt: demoTime(now, 8 * 60),
          createdAt: demoTime(now, 8 * 60 + 5),
        },

        // Read - API outage
        {
          userId: user.id,
          monitorId: MONITOR_IDS.api,
          type: 'MONITOR_DOWN',
          title: 'Production API went down',
          message: 'Internal server error. The monitor returned HTTP 500.',
          readAt: demoTime(now, 8 * 60 + 15),
          createdAt: demoTime(now, 8 * 60 + 25),
        },

        // Read - website recovery
        {
          userId: user.id,
          monitorId: MONITOR_IDS.website,
          type: 'MONITOR_RECOVERED',
          title: 'Vigil Website recovered',
          message: 'The website recovered and is responding with HTTP 200.',
          readAt: demoTime(now, 3 * DAY_MINUTES),
          createdAt: demoTime(now, 3 * DAY_MINUTES + 8),
        },

        // Read - website outage
        {
          userId: user.id,
          monitorId: MONITOR_IDS.website,
          type: 'MONITOR_DOWN',
          title: 'Vigil Website went down',
          message: 'Service temporarily unavailable. The monitor returned HTTP 503.',
          readAt: demoTime(now, 3 * DAY_MINUTES + 12),
          createdAt: demoTime(now, 3 * DAY_MINUTES + 20),
        },

        // Read - older website recovery
        {
          userId: user.id,
          monitorId: MONITOR_IDS.website,
          type: 'MONITOR_RECOVERED',
          title: 'Vigil Website recovered',
          message: 'The monitor recovered after a bad gateway response.',
          readAt: demoTime(now, 7 * DAY_MINUTES - 5),
          createdAt: demoTime(now, 7 * DAY_MINUTES + 5),
        },

        // Read - older website outage
        {
          userId: user.id,
          monitorId: MONITOR_IDS.website,
          type: 'MONITOR_DOWN',
          title: 'Vigil Website went down',
          message: 'The monitor detected HTTP 502 Bad Gateway.',
          readAt: demoTime(now, 7 * DAY_MINUTES + 10),
          createdAt: demoTime(now, 7 * DAY_MINUTES + 15),
        },

        // Read - legacy recovery
        {
          userId: user.id,
          monitorId: MONITOR_IDS.legacy,
          type: 'MONITOR_RECOVERED',
          title: 'Legacy Admin API recovered',
          message: 'The monitor recovered after an internal server error.',
          readAt: demoTime(now, 10 * DAY_MINUTES - 5),
          createdAt: demoTime(now, 10 * DAY_MINUTES + 10),
        },

        // Read - legacy outage
        {
          userId: user.id,
          monitorId: MONITOR_IDS.legacy,
          type: 'MONITOR_DOWN',
          title: 'Legacy Admin API went down',
          message: 'The monitor returned HTTP 500.',
          readAt: demoTime(now, 10 * DAY_MINUTES),
          createdAt: demoTime(now, 10 * DAY_MINUTES + 25),
        },
      ],
    });
  });

  console.log('Demo data seeded successfully.');
  console.log('');
  console.log(`Email: ${DEMO_EMAIL}`);
  console.log(`Password: ${DEMO_PASSWORD}`);
  console.log('');
  console.log('Monitors: 7');
  console.log('Monitor checks: 582');
  console.log('Incidents: 6');
  console.log('Notification channels: 4');
  console.log('In-app notifications: 10');
  console.log('Monitor preferences: 7');
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
