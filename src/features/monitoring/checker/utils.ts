import { MONITOR_MANUAL_CHECK_COOLDOWN_MS } from './constants';

export function getCheckErrorMessage(error: unknown): string {
  if (error instanceof DOMException && error.name === 'TimeoutError') {
    return 'Request timed out.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Request failed.';
}

export function getManualCheckCooldownRemaining(lastCheckedAt: Date | null, now: Date): number {
  if (!lastCheckedAt) {
    return 0;
  }

  const cooldownUntil = lastCheckedAt.getTime() + MONITOR_MANUAL_CHECK_COOLDOWN_MS;

  return Math.max(0, Math.ceil((cooldownUntil - now.getTime()) / 1000));
}
