import { IconMinus, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  featured: boolean;
  features: { label: string; included: boolean }[];
};

const tiers: Tier[] = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'For personal projects and getting started with monitoring.',
    cta: 'Start for free',
    featured: false,
    features: [
      { label: 'Up to 5 monitors', included: true },
      { label: '5-minute check interval', included: true },
      { label: 'Email notifications', included: true },
      { label: '7-day incident history', included: true },
      { label: 'Single region checks', included: true },
      { label: 'Slack & webhook alerts', included: false },
      { label: 'Team members', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For teams that need faster checks and richer alerting options.',
    cta: 'Start free trial',
    featured: true,
    features: [
      { label: 'Unlimited monitors', included: true },
      { label: '30-second check interval', included: true },
      { label: 'Email notifications', included: true },
      { label: '1-year incident history', included: true },
      { label: 'Multi-region checks', included: true },
      { label: 'Slack & webhook alerts', included: true },
      { label: 'Up to 10 team members', included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-primary text-sm font-medium">Pricing</p>
        <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Simple pricing that scales with you
        </h2>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty">
          Start free, upgrade when you need faster checks and a bigger team. No hidden fees.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              'relative flex flex-col rounded-2xl border p-8 transition-colors',
              tier.featured
                ? 'border-primary/50 bg-card shadow-[0_0_0_1px_var(--primary)]'
                : 'border-border bg-card'
            )}
          >
            {tier.featured && (
              <span className="border-primary/40 bg-primary text-primary-foreground absolute -top-3 right-8 rounded-full border px-3 py-1 text-xs font-medium">
                Most popular
              </span>
            )}

            <div className="flex items-baseline justify-between">
              <h3 className="text-foreground text-lg font-medium">{tier.name}</h3>
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-foreground text-4xl font-semibold tracking-tight">
                {tier.price}
              </span>
              <span className="text-muted-foreground text-sm">{tier.period}</span>
            </div>

            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{tier.description}</p>

            <Button
              className="mt-6 w-full"
              size="lg"
              variant={tier.featured ? 'default' : 'outline'}
              nativeButton={false}
              render={<Link href="#" />}
            >
              {tier.cta}
            </Button>

            <div className="bg-border my-7 h-px w-full" />

            <ul className="flex flex-1 flex-col gap-3.5">
              {tier.features.map((feature) => (
                <li key={feature.label} className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full',
                      feature.included
                        ? 'bg-primary/15 text-primary'
                        : 'bg-muted text-muted-foreground'
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
                        : 'text-muted-foreground line-through decoration-border'
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
