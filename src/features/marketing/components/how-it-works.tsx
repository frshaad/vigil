import { IconBellRinging, IconCirclePlus, IconRadar2 } from '@tabler/icons-react';

const steps = [
  {
    number: '01',
    icon: IconCirclePlus,
    title: 'Create a monitor',
    description: 'Add the website or API endpoint you want Vigil to watch.',
  },
  {
    number: '02',
    icon: IconRadar2,
    title: 'Vigil checks it',
    description: 'Vigil periodically sends an HTTP check and records the result.',
  },
  {
    number: '03',
    icon: IconBellRinging,
    title: 'Get alerted',
    description: 'When a service goes down or recovers, Vigil sends the configured notification.',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-primary text-sm font-medium tracking-wide">How it works</p>

        <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          From URL to alert in three steps.
        </h2>
      </div>

      <div className="relative mt-14">
        <div
          aria-hidden="true"
          className="via-border absolute top-9 right-[16%] left-[16%] hidden h-px bg-linear-to-r from-transparent to-transparent md:block"
        />

        <div className="bg-border/70 grid gap-px md:grid-cols-3">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <article
              key={number}
              className="bg-background/85 dark:bg-background/55 relative px-7 py-8 text-center"
            >
              <div className="border-border bg-card mx-auto flex size-12 items-center justify-center border">
                <Icon className="text-primary size-5" strokeWidth={1.7} />
              </div>

              <span className="text-muted-foreground mt-5 block font-mono text-[10px] tracking-[0.2em]">
                STEP {number}
              </span>

              <h3 className="text-foreground mt-2 text-base font-medium">{title}</h3>

              <p className="text-muted-foreground mx-auto mt-2 max-w-xs text-sm leading-6">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
