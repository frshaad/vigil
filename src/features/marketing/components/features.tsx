import {
  IconActivity,
  IconBell,
  IconBolt,
  IconHistory,
  IconLayoutBoard,
  IconShieldCheck,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';

const features: {
  icon: Icon;
  title: string;
  description: string;
}[] = [
  {
    icon: IconActivity,
    title: 'Real-time Monitoring',
    description:
      'Continuously monitor your websites and APIs with reliable health checks and fast downtime detection.',
  },
  {
    icon: IconBell,
    title: 'Instant Notifications',
    description:
      'Receive instant email and Telegram notifications whenever a monitor goes offline.',
  },
  {
    icon: IconLayoutBoard,
    title: 'Beautiful Dashboard',
    description:
      'A clean dashboard for tracking uptime, response times, and incidents in one place.',
  },
  {
    icon: IconShieldCheck,
    title: 'Secure Authentication',
    description:
      'Secure authentication with modern session management to help protect your account.',
  },
  {
    icon: IconBolt,
    title: 'Fast Setup',
    description: 'Add a monitor in seconds by entering a URL. Vigil starts checking it right away.',
  },
  {
    icon: IconHistory,
    title: 'Incident History',
    description:
      'Browse a complete history of incidents, including downtime duration and recovery times.',
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-primary text-sm font-medium">Features</p>
        <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Everything you need to monitor your services
        </h2>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group border-border bg-card hover:border-primary/40 hover:bg-card/80 rounded-xl border p-6 transition-colors duration-200"
          >
            <div className="border-border bg-background text-muted-foreground group-hover:border-primary/40 group-hover:text-primary flex size-10 items-center justify-center rounded-lg border transition-colors">
              <Icon className="size-5" strokeWidth={1.75} />
            </div>
            <h3 className="text-foreground mt-5 text-base font-medium">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
