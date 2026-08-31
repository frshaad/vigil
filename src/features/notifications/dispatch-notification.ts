import type { NotificationEvent } from './events';

export async function dispatchNotification(event: NotificationEvent): Promise<void> {
  switch (event.type) {
    case 'MONITOR_DOWN':
      // channel delivery comes next
      return;
    case 'MONITOR_RECOVERED':
      // channel delivery comes next
      return;
  }
}
