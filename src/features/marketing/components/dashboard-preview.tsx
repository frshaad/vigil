import {
  IconActivity,
  IconArrowNarrowRight,
  IconBell,
  IconCircle,
  IconSearch,
} from '@tabler/icons-react';

import { cn } from '@/lib/utils';

type MonitorStatus = 'up' | 'down';

const monitors: {
  name: string;
  url: string;
  status: MonitorStatus;
  uptime: string;
  latency: string;
}[] = [
  {
    name: 'Marketing site',
    url: 'vigil.io',
    status: 'up',
    uptime: '100%',
    latency: '112ms',
  },
  {
    name: 'API Gateway',
    url: 'api.vigil.io',
    status: 'up',
    uptime: '99.98%',
    latency: '184ms',
  },
  {
    name: 'Auth service',
    url: 'auth.vigil.io',
    status: 'up',
    uptime: '99.94%',
    latency: '168ms',
  },
  {
    name: 'Payments',
    url: 'pay.vigil.io',
    status: 'up',
    uptime: '99.99%',
    latency: '203ms',
  },
];

const statusStyles: Record<MonitorStatus, string> = {
  up: 'bg-(--success)/10 text-(--success)',
  down: 'bg-destructive/10 text-destructive',
};

const statusDot: Record<MonitorStatus, string> = {
  up: 'bg-(--success)',
  down: 'bg-destructive',
};

const statusLabel: Record<MonitorStatus, string> = {
  up: 'Operational',
  down: 'Down',
};

const incidents = [
  {
    time: '14:32',
    title: 'Docs endpoint recovered',
    detail: '503 → 200',
  },
  {
    time: '09:41',
    title: 'Payments recovered',
    detail: 'Downtime resolved',
  },
  {
    time: 'Yesterday',
    title: 'API Gateway incident',
    detail: '12 min downtime',
  },
];

const uptimeBars: MonitorStatus[] = Array.from({ length: 42 }, (_, index) =>
  index === 27 ? 'down' : 'up',
);

function AreaChart() {
  const points = [42, 36, 44, 33, 46, 39, 51, 45, 55, 48, 58, 52, 62, 56, 64];
  const width = 320;
  const height = 90;
  const step = width / (points.length - 1);
  const max = 70;

  const coordinates = points.map((point, index) => [index * step, height - (point / max) * height]);

  const line = coordinates.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `0,${height} ${line} ${width},${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-22 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dashboard-area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.24" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polygon points={area} fill="url(#dashboard-area-fill)" />

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
  const bars = [44, 56, 42, 62, 48, 53, 69, 46, 58, 51, 64, 49, 43, 59, 47, 63];

  return (
    <div className="flex h-22 items-end gap-1">
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-primary/35 flex-1 rounded-t-[3px]"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <div
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="img"
      aria-label="Preview of the Vigil monitoring dashboard"
      className="border-border bg-card overflow-hidden rounded-2xl border shadow-2xl shadow-black/25"
    >
      {/* Browser chrome */}
      <div className="border-border bg-background/70 flex items-center gap-3 border-b px-4 py-3">
        <div className="flex gap-1.5">
          <span className="bg-muted-foreground/25 size-2.5 rounded-full" />
          <span className="bg-muted-foreground/25 size-2.5 rounded-full" />
          <span className="bg-muted-foreground/25 size-2.5 rounded-full" />
        </div>

        <div className="border-border bg-muted/30 mx-auto flex w-full max-w-sm items-center gap-2 rounded-md border px-3 py-1.5">
          <IconSearch className="text-muted-foreground size-3.5" />
          <span className="text-muted-foreground truncate font-mono text-[11px]">
            app.vigil.io/dashboard
          </span>
        </div>

        <div className="w-13" />
      </div>

      <div className="bg-border flex gap-px">
        {/* Sidebar */}
        <aside className="bg-background hidden w-40 shrink-0 flex-col p-3 sm:flex">
          <div className="border-border bg-card rounded-lg border p-2.5">
            <div className="flex items-center gap-2">
              <span className="bg-primary/12 flex size-7 items-center justify-center rounded-md">
                <IconActivity className="text-primary size-4" />
              </span>

              <div>
                <p className="text-foreground text-xs font-semibold">Vigil</p>
                <p className="text-muted-foreground text-[10px]">Monitoring</p>
              </div>
            </div>
          </div>

          <nav className="mt-4 space-y-1">
            <div className="bg-primary/10 text-primary rounded-md px-2.5 py-2 text-xs font-medium">
              Overview
            </div>
            <div className="text-muted-foreground px-2.5 py-2 text-xs">Monitors</div>
            <div className="text-muted-foreground px-2.5 py-2 text-xs">Notifications</div>
          </nav>

          <div className="text-muted-foreground mt-auto px-2.5 text-[10px]">
            All your monitors in one place.
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="bg-card flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-foreground text-sm font-semibold">Overview</p>
              <p className="text-muted-foreground mt-0.5 text-[11px]">Last 24 hours</p>
            </div>

            <div className="relative flex size-7 items-center justify-center rounded-md">
              <IconBell className="text-muted-foreground size-4" />
              <span className="bg-destructive text-destructive-foreground absolute -top-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full text-[8px] font-medium">
                2
              </span>
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-border grid gap-px sm:grid-cols-3">
            <div className="bg-card px-5 py-4">
              <p className="text-muted-foreground text-[11px]">Monitors</p>
              <p className="text-foreground mt-1 font-mono text-xl font-semibold">4</p>
              <p className="mt-1 text-[10px] text-(--success)">All operational</p>
            </div>

            <div className="bg-card px-5 py-4">
              <p className="text-muted-foreground text-[11px]">Uptime</p>
              <p className="text-foreground mt-1 font-mono text-xl font-semibold">99.98%</p>
              <p className="mt-1 flex items-center gap-1 text-[10px] text-(--success)">
                <IconArrowNarrowRight className="size-3" />
                0.04%
              </p>
            </div>

            <div className="bg-card px-5 py-4">
              <p className="text-muted-foreground text-[11px]">Avg. response</p>
              <p className="text-foreground mt-1 font-mono text-xl font-semibold">184ms</p>
              <p className="text-muted-foreground mt-1 text-[10px]">Across all monitors</p>
            </div>
          </div>

          {/* Main dashboard grid */}
          <div className="bg-border grid gap-px lg:grid-cols-[1.25fr_0.75fr]">
            {/* Monitors */}
            <div className="bg-card px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm font-semibold">Monitors</p>
                  <p className="text-muted-foreground mt-0.5 text-[10px]">Current monitor status</p>
                </div>

                <span className="text-muted-foreground rounded-full border px-2 py-1 text-[10px]">
                  4 active
                </span>
              </div>

              <div className="space-y-1">
                {monitors.map((monitor) => (
                  <div
                    key={monitor.name}
                    className="hover:bg-muted/40 flex items-center justify-between rounded-lg px-2 py-2 transition-colors"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn('size-2 shrink-0 rounded-full', statusDot[monitor.status])}
                      />

                      <div className="min-w-0">
                        <p className="text-foreground truncate text-xs font-medium">
                          {monitor.name}
                        </p>
                        <p className="text-muted-foreground truncate font-mono text-[10px]">
                          {monitor.url}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-muted-foreground hidden font-mono text-[10px] sm:inline">
                        {monitor.latency}
                      </span>

                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[9px] font-medium',
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

            {/* Uptime */}
            <div className="bg-card px-5 py-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-foreground text-xs font-medium">Uptime</p>
                  <p className="text-muted-foreground mt-0.5 text-[10px]">Last 7 days</p>
                </div>

                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[9px] font-medium">
                  99.98%
                </span>
              </div>

              <AreaChart />

              <div className="mt-3 flex gap-0.75">
                {uptimeBars.map((status, index) => (
                  <span
                    key={index}
                    className={cn(
                      'h-5 flex-1 rounded-[3px]',
                      statusDot[status],
                      status === 'up' && 'opacity-65',
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="bg-card px-5 py-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-foreground text-xs font-medium">Response time</p>
                <span className="text-muted-foreground font-mono text-[10px]">184ms avg.</span>
              </div>

              <ResponseBars />

              <div className="text-muted-foreground mt-2 flex justify-between font-mono text-[9px]">
                <span>Earlier</span>
                <span>Now</span>
              </div>
            </div>

            {/* Incidents */}
            <div className="bg-card px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-foreground text-xs font-medium">Recent incidents</p>
                <span className="text-muted-foreground text-[10px]">History</span>
              </div>

              <ol className="space-y-3">
                {incidents.map((incident) => (
                  <li key={`${incident.time}-${incident.title}`} className="flex gap-2.5">
                    <IconCircle className="mt-0.5 size-2.5 shrink-0 fill-current text-(--success)" />

                    <div className="min-w-0">
                      <p className="text-foreground truncate text-[10px] font-medium">
                        {incident.title}
                      </p>
                      <p className="text-muted-foreground mt-0.5 text-[9px]">
                        {incident.time} · {incident.detail}
                      </p>
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
