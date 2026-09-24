import { IconBellRinging, IconCirclePlus, IconRadar } from '@tabler/icons-react';

const steps = [
  {
    icon: IconCirclePlus,
    step: '01',
    title: 'Add an endpoint',
    description: 'Create a monitor and enter the website or API endpoint you want to watch.',
  },
  {
    icon: IconRadar,
    step: '02',
    title: 'Vigil checks it automatically',
    description:
      'Vigil regularly checks the endpoint and records its status, response time, and result.',
  },
  {
    icon: IconBellRinging,
    step: '03',
    title: 'Get notified',
    description:
      'When a monitor goes down or recovers, Vigil records the incident and sends your configured alerts.',
  },
];

export default function HowItWorks() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-medium">How it works</p>

          <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            From URL to monitoring in three steps
          </h2>
        </div>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="via-border via-border absolute top-6 right-[16%] left-[16%] hidden h-px bg-linear-to-r from-transparent to-transparent md:block"
          />

          {steps.map(({ icon: Icon, step, title, description }) => (
            <article key={step} className="relative flex flex-col items-center text-center">
              <div className="border-border bg-card text-primary relative z-10 flex size-12 items-center justify-center rounded-full border">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>

              <span className="text-muted-foreground mt-5 font-mono text-xs">{step}</span>

              <h3 className="text-foreground mt-1 text-base font-medium">{title}</h3>

              <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
