import type { Monitor } from '@/../prisma/generated/client';

export function formatResponseTime(responseTimeMs: Monitor['lastResponseTimeMs']): string {
  if (responseTimeMs === null) {
    return '—';
  }

  return `${responseTimeMs.toLocaleString()} ms`;
}

export function formatHttpStatus(statusCode: Monitor['lastStatusCode']): string {
  if (statusCode === null) {
    return '—';
  }

  return String(statusCode);
}

export function getHttpStatusLabel(statusCode: Monitor['lastStatusCode']): string {
  if (statusCode === null) {
    return 'No response';
  }

  if (statusCode >= 200 && statusCode < 300) {
    return 'OK';
  }

  if (statusCode >= 300 && statusCode < 400) {
    return 'Redirect';
  }

  if (statusCode >= 400 && statusCode < 500) {
    return 'Client error';
  }

  if (statusCode >= 500) {
    return 'Server error';
  }

  return 'Unknown';
}

export function getMonitorStatusLabel({
  isActive,
  lastStatus,
}: Pick<Monitor, 'isActive' | 'lastStatus'>) {
  if (!isActive) {
    return 'Paused';
  }

  if (lastStatus === 'UP') {
    return 'Operational';
  }

  if (lastStatus === 'DOWN') {
    return 'Down';
  }

  return 'Waiting for first check';
}

export function getMonitorStatusVariant({
  isActive,
  lastStatus,
}: Pick<Monitor, 'isActive' | 'lastStatus'>) {
  if (!isActive) {
    return 'secondary' as const;
  }

  if (lastStatus === 'UP') {
    return 'default' as const;
  }

  if (lastStatus === 'DOWN') {
    return 'destructive' as const;
  }

  return 'outline' as const;
}

export function parseMonitorUrl(value: string) {
  const url = new URL(value);

  return {
    origin: url.origin,
    pathname: url.pathname,
    search: url.search,
  };
}

export function formatRelativeDate(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) {
    return 'Just now';
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days}d ago`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(date);
}

export function formatInterval(seconds: number) {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = seconds / 60;

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = minutes / 60;

  return `${hours} hr`;
}

export function formatDuration(start: Date, end: Date) {
  const seconds = Math.max(0, Math.floor((end.getTime() - start.getTime()) / 1000));

  const minutes = Math.floor(seconds / 60);

  if (minutes < 1) {
    return `${seconds}s`;
  }

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}
