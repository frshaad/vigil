import { IconArrowNarrowRight, IconBell, IconCircle, IconSearch } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

type MonitorStatus = 'up' | 'degraded' | 'down';

const monitors: {
  name: string;
  url: string;
  status: MonitorStatus;
  uptime: string;
  latency: string;
}[] = [
  { name: 'Marketing site', url: 'vigil.io', status: 'up', uptime: '100%', latency: '112ms' },
  { name: 'API Gateway', url: 'api.vigil.io', status: 'up', uptime: '99.98%', latency: '184ms' },
  {
    name: 'Auth service',
    url: 'auth.vigil.io',
    status: 'degraded',
    uptime: '99.4%',
    latency: '642ms',
  },
  { name: 'Payments', url: 'pay.vigil.io', status: 'up', uptime: '99.99%', latency: '203ms' },
  { name: 'Docs', url: 'docs.vigil.io', status: 'down', uptime: '97.2%', latency: '—' },
];

const statusStyles: Record<MonitorStatus, string> = {
  up: 'border-(--success)/20 bg-(--success)/8 text-(--success)',
  degraded: 'border-(--warning)/20 bg-(--warning)/8 text-(--warning)',
  down: 'border-destructive/20 bg-destructive/8 text-destructive',
};

const statusDot: Record<MonitorStatus, string> = {
  up: 'bg-(--success)',
  degraded: 'bg-(--warning)',
  down: 'bg-destructive',
};

const statusLabel: Record<MonitorStatus, string> = {
  up: 'Operational',
  degraded: 'Degraded',
  down: 'Down',
};

const incidents = [
  { time: '14:32', title: 'Docs endpoint returned 503', level: 'down' as MonitorStatus },
  { time: '11:08', title: 'Auth latency above threshold', level: 'degraded' as MonitorStatus },
  { time: '09:41', title: 'Payments recovered', level: 'up' as MonitorStatus },
];

const uptimeBars = Array.from({ length: 40 }, (_, i) => {
  if (i === 27) {
    return 'down';
  }
  if (i === 14 || i === 33) {
    return 'degraded';
  }
  return 'up';
}) as MonitorStatus[];

function AreaChart() {
  const points = [38, 34, 40, 30, 44, 36, 48, 42, 52, 46, 58, 50, 62, 55, 60];
  const w = 320;
  const h = 96;
  const step = w / (points.length - 1);
  const max = 70;
  const coords = points.map((p, i) => [i * step, h - (p / max) * h]);
  const line = coords.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `0,${h} ${line} ${w},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polygon points={area} fill="url(#area-fill)" />

      <polyline
        points={line}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ResponseBars() {
  const bars = [42, 55, 38, 60, 47, 52, 66, 44, 58, 50, 63, 48, 40, 57, 45, 61, 49, 54];

  return (
    <div className="flex h-24 items-end gap-1">
      {bars.map((bar, index) => (
        <div key={index} className="bg-primary/35 flex-1" style={{ height: `${bar}%` }} />
      ))}
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <div className="border-border/80 bg-card relative overflow-hidden border shadow-2xl shadow-black/15 dark:shadow-black/50">
      <div
        aria-hidden="true"
        className="via-primary/70 pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent"
      />

      <div className="border-border/80 bg-background/50 flex items-center gap-2 border-b px-4 py-3">
        <div className="flex gap-1.5">
          <span className="bg-muted-foreground/25 size-2.5" />
          <span className="bg-muted-foreground/25 size-2.5" />
          <span className="bg-muted-foreground/25 size-2.5" />
        </div>

        <div className="border-border bg-muted/40 mx-auto flex w-full max-w-xs items-center gap-2 border px-3 py-1.5">
          <IconSearch className="text-muted-foreground size-3" />
          <span className="text-muted-foreground font-mono text-xs">app.vigil.io/dashboard</span>
        </div>

        <div className="w-13.5" />
      </div>

      <div className="bg-border grid gap-px sm:grid-cols-[1fr_1.4fr]">
        <div className="bg-border flex flex-col gap-px">
          <div className="bg-card flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-foreground text-sm font-semibold">Overview</p>
              <p className="text-muted-foreground text-xs">Last 24 hours</p>
            </div>

            <div className="relative">
              <IconBell className="text-muted-foreground size-4" />
              <span className="bg-destructive absolute -top-0.5 -right-0.5 size-1.5" />
            </div>
          </div>

          <div className="bg-border grid grid-cols-2 gap-px">
            <div className="bg-card px-5 py-4">
              <p className="text-muted-foreground text-xs">Uptime</p>
              <p className="text-foreground mt-1 font-mono text-xl font-semibold">99.98%</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-(--success)">
                <IconArrowNarrowRight className="size-3" />
                0.04%
              </p>
            </div>

            <div className="bg-card px-5 py-4">
              <p className="text-muted-foreground text-xs">Avg. response</p>
              <p className="text-foreground mt-1 font-mono text-xl font-semibold">184ms</p>
              <p className="text-muted-foreground mt-1 text-xs">across 12 monitors</p>
            </div>
          </div>

          <div className="bg-card flex flex-1 flex-col px-5 py-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-foreground text-xs font-medium">Uptime</p>

              <span className="border-primary/20 bg-primary/10 text-primary border px-2 py-0.5 text-[10px] font-medium">
                7d
              </span>
            </div>

            <AreaChart />

            <div className="mt-auto flex gap-0.75 pt-3">
              {uptimeBars.map((status, index) => (
                <span
                  key={index}
                  className={cn('h-6 flex-1', statusDot[status], status === 'up' && 'opacity-70')}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-border flex flex-col gap-px">
          <div className="bg-card px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-foreground text-sm font-semibold">Monitors</p>
              <span className="text-muted-foreground text-xs">5 active</span>
            </div>

            <div className="space-y-1">
              {monitors.map((monitor) => (
                <div
                  key={monitor.name}
                  className="hover:bg-muted/40 flex items-center justify-between px-2 py-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn('size-2', statusDot[monitor.status])} />

                    <div>
                      <p className="text-foreground text-sm">{monitor.name}</p>
                      <p className="text-muted-foreground font-mono text-xs">{monitor.url}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground hidden font-mono text-xs sm:inline">
                      {monitor.latency}
                    </span>

                    <span
                      className={cn(
                        'border px-2 py-0.5 text-[10px] font-medium',
                        statusStyles[monitor.status],
                      )}
                    >
                      {statusLabel[monitor.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-border grid gap-px sm:grid-cols-2">
            <div className="bg-card px-5 py-4">
              <p className="text-foreground mb-2 text-xs font-medium">Response time</p>

              <ResponseBars />

              <p className="text-muted-foreground mt-2 font-mono text-xs">p95 · 214ms</p>
            </div>

            <div className="bg-card px-5 py-4">
              <p className="text-foreground mb-3 text-xs font-medium">Incidents</p>

              <ol className="space-y-3">
                {incidents.map((incident) => (
                  <li key={incident.time} className="flex gap-3">
                    <IconCircle
                      className={cn('mt-1 size-2 shrink-0 fill-current', {
                        'text-(--success)': incident.level === 'up',
                        'text-(--warning)': incident.level === 'degraded',
                        'text-destructive': incident.level === 'down',
                      })}
                    />

                    <div>
                      <p className="text-foreground text-xs leading-tight">{incident.title}</p>
                      <p className="text-muted-foreground font-mono text-[10px]">{incident.time}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
