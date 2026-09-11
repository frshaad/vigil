import type { DashboardMonitor } from './dal';

export function sortDashboardMonitors(monitors: DashboardMonitor[]) {
  return [...monitors].sort((a, b) => {
    const aPinned = a.monitorPreference?.isPinned ?? false;
    const bPinned = b.monitorPreference?.isPinned ?? false;

    if (aPinned !== bPinned) {
      return aPinned ? -1 : 1;
    }

    if (aPinned && bPinned) {
      return (a.monitorPreference?.position ?? 0) - (b.monitorPreference?.position ?? 0);
    }

    return a.name.localeCompare(b.name);
  });
}
