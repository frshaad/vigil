import {
  IconActivity,
  IconBell,
  IconChartLine,
  IconHistory,
  IconSettings,
  IconWorld,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';

const features: {
  icon: Icon;
  title: string;
  description: string;
}[] = [
  {
    icon: IconWorld,
    title: 'Automatic Monitoring',
    description:
      'Monitor websites and APIs with automatic HTTP and HTTPS health checks at a regular interval.',
  },
  {
    icon: IconBell,
    title: 'Multi-channel Alerts',
    description:
      'Get notified through email, Telegram, and Vigil’s built-in notification center when monitor status changes.',
  },
  {
    icon: IconActivity,
    title: 'Uptime Tracking',
    description:
      'See monitor status, uptime, response times, status codes, and errors without leaving the dashboard.',
  },
  {
    icon: IconHistory,
    title: 'Incident History',
    description:
      'Keep a record of outages and recoveries with timestamps, errors, status codes, and downtime.',
  },
  {
    icon: IconChartLine,
    title: 'Response Insights',
    description:
      'Track response times over time so slow endpoints are easier to spot alongside uptime data.',
  },
  {
    icon: IconSettings,
    title: 'Simple Monitor Management',
    description:
      'Create, edit, pause, delete, and manually check monitors from a focused, straightforward interface.',
  },
];

export default function Features() {
  return (
    <section id="features" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-medium">Features</p>

          <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Everything you need to keep an eye on your services
          </h2>

          <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty">
            A focused monitoring workflow without the complexity of a full observability platform.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group border-border bg-card hover:border-primary/30 rounded-xl border p-6 transition-colors duration-200"
            >
              <div className="border-border bg-background text-muted-foreground group-hover:border-primary/30 group-hover:text-primary flex size-10 items-center justify-center rounded-lg border transition-colors">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>

              <h3 className="text-foreground mt-5 text-base font-medium">{title}</h3>

              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
