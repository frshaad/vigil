import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const DEMO_EMAIL = 'demo@vigil.dev';
const DEMO_PASSWORD = 'DemoPassword123!';

async function main() {
  let user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });

  if (!user) {
    const result = await auth.api.signUpEmail({
      body: {
        name: 'Demo User',
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      },
    });

    user = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      emailVerified: result.user.emailVerified,
      image: result.user.image ?? null,
      createdAt: result.user.createdAt,
      updatedAt: result.user.updatedAt,
    };
  }

  // Subscription
  await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {
      plan: 'PRO',
      status: 'ACTIVE',
    },
    create: {
      userId: user.id,
      plan: 'PRO',
      status: 'ACTIVE',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // Notification channels
  const emailChannel = await prisma.notificationChannel.upsert({
    where: { id: 'demo-email-channel' },
    update: {},
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

  const telegramChannel = await prisma.notificationChannel.upsert({
    where: { id: 'demo-telegram-channel' },
    update: {},
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
  const website = await prisma.monitor.upsert({
    where: { id: 'demo-monitor-website' },
    update: {},
    create: {
      id: 'demo-monitor-website',
      userId: user.id,
      name: 'Marketing Website',
      url: 'https://vigil.dev',
      method: 'GET',
      intervalSeconds: 60,
      isActive: true,
      lastCheckedAt: new Date(Date.now() - 30_000),
      lastStatus: 'UP',
      lastStatusCode: 200,
      lastResponseTimeMs: 142,
      notificationChannels: {
        connect: [{ id: emailChannel.id }, { id: telegramChannel.id }],
      },
    },
  });

  const api = await prisma.monitor.upsert({
    where: { id: 'demo-monitor-api' },
    update: {},
    create: {
      id: 'demo-monitor-api',
      userId: user.id,
      name: 'Production API',
      url: 'https://api.vigil.dev/health',
      method: 'GET',
      intervalSeconds: 60,
      isActive: true,
      lastCheckedAt: new Date(Date.now() - 75_000),
      lastStatus: 'UP',
      lastStatusCode: 200,
      lastResponseTimeMs: 87,
      notificationChannels: {
        connect: [{ id: emailChannel.id }],
      },
    },
  });

  const docs = await prisma.monitor.upsert({
    where: { id: 'demo-monitor-docs' },
    update: {},
    create: {
      id: 'demo-monitor-docs',
      userId: user.id,
      name: 'Documentation',
      url: 'https://docs.vigil.dev',
      method: 'GET',
      intervalSeconds: 300,
      isActive: false,
      lastCheckedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      lastStatus: 'UNKNOWN',
      lastStatusCode: null,
      lastResponseTimeMs: null,
    },
  });

  // Incidents
  await prisma.incident.deleteMany({
    where: {
      monitorId: {
        in: [website.id, api.id, docs.id],
      },
    },
  });

  await prisma.incident.createMany({
    data: [
      {
        monitorId: website.id,
        startedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        resolvedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 1000),
        status: 'RESOLVED',
        statusCode: 503,
        error: 'Service temporarily unavailable',
      },
      {
        monitorId: website.id,
        startedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        resolvedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000 + 3 * 60 * 1000),
        status: 'RESOLVED',
        statusCode: 502,
        error: 'Bad gateway',
      },
      {
        monitorId: api.id,
        startedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        resolvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 11 * 60 * 1000),
        status: 'RESOLVED',
        statusCode: 500,
        error: 'Internal server error',
      },
      {
        monitorId: api.id,
        startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        resolvedAt: null,
        status: 'OPEN',
        statusCode: 504,
        error: 'Gateway timeout',
      },
    ],
  });

  console.log('Demo user seeded successfully.');
  console.log(`Email: ${DEMO_EMAIL}`);
  console.log(`Password: ${DEMO_PASSWORD}`);
  console.log(`Monitors: ${[website, api, docs].length}`);
}

await main();
await prisma.$disconnect();
