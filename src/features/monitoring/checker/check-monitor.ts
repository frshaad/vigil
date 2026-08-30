import type { MonitorMethod } from '@/../prisma/generated/enums';

import {
  MONITOR_CHECK_TIMEOUT_MS,
  MONITOR_SUCCESS_STATUS_MAX,
  MONITOR_SUCCESS_STATUS_MIN,
} from './constants';
import type { MonitorCheckResult } from './schema';
import { getCheckErrorMessage } from './utils';

export async function checkMonitor(
  url: string,
  method: MonitorMethod
): Promise<MonitorCheckResult> {
  const startedAt = performance.now();

  try {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(MONITOR_CHECK_TIMEOUT_MS),
    });

    const responseTimeMs = Math.round(performance.now() - startedAt);

    const isSuccessful =
      response.status >= MONITOR_SUCCESS_STATUS_MIN &&
      response.status <= MONITOR_SUCCESS_STATUS_MAX;

    return {
      status: isSuccessful ? 'UP' : 'DOWN',
      statusCode: response.status,
      responseTimeMs,
      error: isSuccessful ? null : `HTTP ${response.status}`,
    };
  } catch (error) {
    const responseTimeMs = Math.round(performance.now() - startedAt);

    return {
      status: 'DOWN',
      statusCode: null,
      responseTimeMs,
      error: getCheckErrorMessage(error),
    };
  }
}
