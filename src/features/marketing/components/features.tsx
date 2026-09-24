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
  number: string;
}[] = [
  {
    number: '01',
    icon: IconActivity,
    title: 'Continuous monitoring',
    description:
      'Keep an eye on websites and APIs with recurring HTTP health checks and response-time tracking.',
  },
  {
    number: '02',
    icon: IconBell,
    title: 'Instant alerts',
    description:
      'Get notified when a monitor goes down or recovers through the notification channels you configure.',
  },
  {
    number: '03',
    icon: IconLayoutBoard,
    title: 'Clear dashboard',
    description:
      'See monitor health, uptime, response times, incidents and recent checks without the noise of a full observability suite.',
  },
  {
    number: '04',
    icon: IconShieldCheck,
    title: 'Secure authentication',
    description:
      'Modern authentication and session management keep your monitoring data protected.',
  },
  {
    number: '05',
    icon: IconBolt,
    title: 'Fast setup',
    description:
      'Add a URL, choose a method and start monitoring without configuring a complicated stack.',
  },
  {
    number: '06',
    icon: IconHistory,
    title: 'Incident history',
    description:
      'Understand what happened with recorded incidents, downtime and recovery information.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-primary text-sm font-medium tracking-wide">Features</p>

        <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Focused monitoring. Nothing unnecessary.
        </h2>

        <p className="text-muted-foreground mt-4 text-base leading-7 text-pretty">
          The essentials for knowing whether your services are healthy, without turning a simple
          monitoring problem into an observability project.
        </p>
      </div>

      <div className="border-border/80 bg-card/40 mt-14 overflow-hidden border shadow-[0_20px_70px_-45px_rgba(0,0,0,0.45)]">
        <div className="bg-border/70 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ number, icon: Icon, title, description }) => (
            <article
              key={title}
              className="group bg-background/85 hover:bg-card dark:bg-background/55 dark:hover:bg-card/45 relative p-6 transition-colors duration-200"
            >
              <span
                aria-hidden="true"
                className="bg-primary/0 group-hover:bg-primary/60 absolute inset-x-0 top-0 h-px transition-colors duration-200"
              />

              <div className="flex items-start justify-between">
                <div className="border-border bg-card/70 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary flex size-10 items-center justify-center border transition-colors">
                  <Icon className="size-5" strokeWidth={1.7} />
                </div>

                <span className="text-muted-foreground/50 font-mono text-[10px] tracking-widest">
                  {number}
                </span>
              </div>

              <h3 className="text-foreground mt-6 text-base font-medium">{title}</h3>

              <p className="text-muted-foreground mt-2 text-sm leading-6">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
