import { MonitorCheckCooldownError, runMonitorCheck } from '../run-monitor-check';
import { SCHEDULER_CONCURRENCY } from './constants';
import { getDueMonitors } from './get-due-monitors';

interface SchedulerResult {
  checked: number;
  skipped: number;
  failed: number;
}

export async function runDueMonitorChecks(): Promise<SchedulerResult> {
  const monitors = await getDueMonitors();

  let checked = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < monitors.length; i += SCHEDULER_CONCURRENCY) {
    const batch = monitors.slice(i, i + SCHEDULER_CONCURRENCY);

    await Promise.all(
      batch.map(async (monitor) => {
        try {
          await runMonitorCheck({
            monitorId: monitor.id,
            userId: monitor.userId,
          });

          checked++;
        } catch (error) {
          if (error instanceof MonitorCheckCooldownError) {
            skipped++;
            return;
          }

          failed++;

          console.error(`Scheduled monitor check failed for ${monitor.id}:`, error);
        }
      })
    );
  }

  return {
    checked,
    skipped,
    failed,
  };
}
