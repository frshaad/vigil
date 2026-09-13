import { MetricCard } from '@/features/monitors/components/metric-card';

interface DashboardMetricsProps {
  metrics: {
    total: number;
    up: number;
    down: number;
    paused: number;
  };
}

export default function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  return (
    <section aria-label="Monitor summary" className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <MetricCard label="Monitors" value={metrics.total} />

      <MetricCard label="Up" value={metrics.up} />

      <MetricCard label="Down" value={metrics.down} />

      <MetricCard label="Paused" value={metrics.paused} />
    </section>
  );
}
