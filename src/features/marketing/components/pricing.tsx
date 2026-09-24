import { IconCheck } from '@tabler/icons-react';
import { Suspense } from 'react';

import { cn } from '@/lib/utils';

import GetStartedButton from './get-started-button';

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  featured: boolean;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to start monitoring a small set of websites and APIs.',
    featured: false,
    features: [
      'Up to 5 monitors',
      '60-second monitoring interval',
      'Email notifications',
      '1 notification channel',
      '7-day incident history',
      'Uptime and response-time metrics',
      'In-app notification center',
    ],
  },
  {
    name: 'Pro',
    price: 'Pro',
    period: 'coming soon',
    description:
      'More monitoring capacity, faster checks, and additional notification options for larger workloads.',
    featured: true,
    features: [
      'Higher monitor limits',
      '30-second monitoring interval',
      'Email notifications',
      'Telegram notifications',
      'Multiple notification channels',
      'Longer incident history',
      'Additional premium features',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-medium">Pricing</p>

          <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Start free. Upgrade when you need more.
          </h2>

          <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty">
            Keep things simple while you get started. Pro features are planned for a future release.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative flex flex-col rounded-2xl border p-8',
                tier.featured
                  ? 'border-primary/40 bg-card shadow-[0_0_0_1px_var(--primary)]'
                  : 'border-border bg-card',
              )}
            >
              {tier.featured && (
                <span className="border-primary/30 bg-card text-primary absolute -top-3 right-8 rounded-full border px-3 py-1 text-xs font-medium">
                  Coming soon
                </span>
              )}

              <div>
                <h3 className="text-foreground text-lg font-medium">{tier.name}</h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-foreground text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>

                  <span className="text-muted-foreground text-sm">{tier.period}</span>
                </div>

                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {tier.featured ? (
                <button
                  type="button"
                  disabled
                  className="bg-muted text-muted-foreground mt-6 h-11 w-full rounded-lg px-4 text-sm font-medium"
                >
                  Coming soon
                </button>
              ) : (
                <Suspense>
                  <GetStartedButton variant="outline" withoutIcon className="mt-6" />
                </Suspense>
              )}

              <div className="bg-border my-7 h-px w-full" />

              <ul className="flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="bg-primary/12 text-primary flex size-5 shrink-0 items-center justify-center rounded-full">
                      <IconCheck className="size-3" strokeWidth={2.5} />
                    </span>

                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
