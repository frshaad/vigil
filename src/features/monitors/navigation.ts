import type { Route } from 'next';

const MONITOR_BACK_NAVIGATION = {
  '/dashboard': 'Back to dashboard',
  '/dashboard/monitors': 'Back to monitors',
} as const satisfies Partial<Record<Route, string>>;

const DEFAULT_MONITOR_BACK_URL: Route = '/dashboard/monitors';

type AllowedMonitorBackRoute = keyof typeof MONITOR_BACK_NAVIGATION;

function isAllowedRoute(url: unknown): url is AllowedMonitorBackRoute {
  return typeof url === 'string' && url in MONITOR_BACK_NAVIGATION;
}

export function resolveMonitorBackUrl(param: string | string[] | undefined): Route {
  const url = Array.isArray(param) ? param[0] : param;

  if (isAllowedRoute(url)) {
    return url;
  }

  return DEFAULT_MONITOR_BACK_URL;
}

export function getMonitorBackLabel(url: Route): string {
  return MONITOR_BACK_NAVIGATION[url as AllowedMonitorBackRoute] ?? 'Back';
}
