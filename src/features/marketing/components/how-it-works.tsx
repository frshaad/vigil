import { IconCirclePlus, IconRadar2, IconBellRinging } from '@tabler/icons-react';

const steps = [
  {
    icon: IconCirclePlus,
    step: '01',
    title: 'Create a monitor',
    description: 'Add any website or API endpoint you want to keep an eye on.',
  },
  {
    icon: IconRadar2,
    step: '02',
    title: 'We continuously check',
    description: 'Vigil pings your endpoint on an interval from multiple regions.',
  },
  {
    icon: IconBellRinging,
    step: '03',
    title: 'Receive notifications',
    description: 'The instant something goes down, you and your team are alerted.',
  },
];

export function HowItWorks() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-medium">How it works</p>
          <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Up and running in three steps
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          {/* connecting line */}
          <div
            aria-hidden="true"
            className="via-border absolute top-6 right-0 left-0 hidden h-px bg-linear-to-r from-transparent to-transparent md:block"
          />
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="relative flex flex-col items-center text-center">
              <div className="border-border bg-card text-primary flex size-12 items-center justify-center rounded-full border">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
              <span className="text-muted-foreground mt-5 font-mono text-xs">{step}</span>
              <h3 className="text-foreground mt-1 text-base font-medium">{title}</h3>
              <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
