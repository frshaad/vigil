import { NextResponse } from 'next/server';

import { env } from '@/env';
import { runDueMonitorChecks } from '@/features/monitoring/scheduler/run-due-monitors';

export async function GET(request: Request) {
  const authorization = request.headers.get('authorization');

  if (authorization !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await runDueMonitorChecks();

  return NextResponse.json({ ok: true, ...result });
}
