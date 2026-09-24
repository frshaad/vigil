import { IconCheck, IconMinus } from '@tabler/icons-react';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import GetStartedButton from './get-started-button';

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  CTA: React.ReactNode;
  featured: boolean;
  features: { label: string; included: boolean }[];
};

const tiers: Tier[] = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'For personal websites, side projects and getting started.',
    CTA: (
      <Suspense>
        <GetStartedButton variant="outline" withoutIcon className="mt-6 w-full" />
      </Suspense>
    ),
    featured: false,
    features: [
      { label: 'Up to 5 monitors', included: true },
      { label: '60-second monitoring interval', included: true },
      { label: 'Email notifications', included: true },
      { label: '1 notification channel', included: true },
      { label: '7-day incident history', included: true },
      { label: 'Public status page', included: false },
      { label: 'Telegram notifications', included: false },
      { label: 'Multiple notification channels', included: false },
      { label: 'Team members', included: false },
      { label: 'Priority support', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For businesses that need more monitors and richer notifications.',
    CTA: (
      <Button className="mt-6 w-full" size="lg" disabled>
        Coming Soon
      </Button>
    ),
    featured: true,
    features: [
      { label: 'Unlimited monitors', included: true },
      { label: '30-second monitoring interval', included: true },
      { label: 'Email notifications', included: true },
      { label: 'Telegram notifications', included: true },
      { label: 'Unlimited notification channels', included: true },
      { label: '1-year incident history', included: true },
      { label: 'Public status page', included: true },
      { label: 'Up to 10 team members', included: true },
      { label: 'Priority support', included: true },
      { label: 'Future premium integrations', included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-primary text-sm font-medium tracking-wide">Pricing</p>

        <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Simple pricing that scales with you.
        </h2>

        <p className="text-muted-foreground mt-4 text-base leading-7 text-pretty">
          Start free and move to Pro when you need more capacity and advanced notification options.
        </p>
      </div>

      <div className="border-border/80 bg-card/30 mx-auto mt-14 grid max-w-5xl overflow-hidden border lg:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              'relative flex flex-col p-8 sm:p-10',
              tier.featured
                ? 'bg-primary/[0.035] dark:bg-primary/8'
                : 'bg-background/75 dark:bg-background/45',
              tier.featured && 'lg:border-l lg:border-border/70',
            )}
          >
            {tier.featured && (
              <div className="border-primary/30 bg-primary/10 text-primary absolute top-0 right-0 border-b border-l px-3 py-1.5 text-[10px] font-medium tracking-wide uppercase">
                Coming next
              </div>
            )}

            <h3 className="text-foreground text-lg font-medium">{tier.name}</h3>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-foreground text-4xl font-semibold tracking-tight">
                {tier.price}
              </span>
              <span className="text-muted-foreground text-sm">{tier.period}</span>
            </div>

            <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
              {tier.description}
            </p>

            {tier.CTA}

            <div className="bg-border/80 my-7 h-px w-full" />

            <ul className="flex flex-1 flex-col gap-3.5">
              {tier.features.map((feature) => (
                <li key={feature.label} className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center border',
                      feature.included
                        ? 'border-primary/20 bg-primary/10 text-primary'
                        : 'border-border bg-muted/50 text-muted-foreground',
                    )}
                  >
                    {feature.included ? (
                      <IconCheck className="size-3" strokeWidth={2.5} />
                    ) : (
                      <IconMinus className="size-3" strokeWidth={2.5} />
                    )}
                  </span>

                  <span
                    className={cn(
                      'text-sm',
                      feature.included
                        ? 'text-foreground'
                        : 'text-muted-foreground line-through decoration-border',
                    )}
                  >
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
