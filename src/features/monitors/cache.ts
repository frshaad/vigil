export function monitorTag(userId: string, monitorId: string) {
  return `monitor:${userId}:${monitorId}`;
}

export function monitorsTag(userId: string) {
  return `monitors:${userId}`;
}
