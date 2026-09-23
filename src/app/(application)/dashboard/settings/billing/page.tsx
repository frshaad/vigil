import type { Metadata } from 'next';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getUserSubscription } from '@/features/billing/dal';
import { formatDate } from '@/features/billing/format';
import { getCurrentUserOrRedirect } from '@/lib/auth/session';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Billing',
  description: 'View your current Vigil subscription and plan.',
  noIndex: true,
});

const planDetails = {
  FREE: {
    name: 'Free',
    description: 'For getting started with website monitoring.',
    features: ['Basic monitor management', 'In-app notifications'],
  },
  PRO: {
    name: 'Pro',
    description: 'For more monitoring and notification capabilities.',
    features: [
      'Advanced monitoring',
      'Email notifications',
      'Telegram notifications',
      'In-app notifications',
    ],
  },
} as const;

const statusLabels = {
  ACTIVE: 'Active',
  CANCELED: 'Canceled',
  PAST_DUE: 'Past due',
} as const;

export default async function BillingSettingsPage() {
  const user = await getCurrentUserOrRedirect();

  const subscription = await getUserSubscription(user.id);

  const plan = subscription?.plan ?? 'FREE';
  const details = planDetails[plan];
  const status = subscription?.status ?? 'ACTIVE';

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-medium">Billing</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          View your current subscription and plan details.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">Current plan</CardTitle>

            <p className="text-muted-foreground mt-1 text-sm">Your current Vigil subscription.</p>
          </div>

          <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-medium">
            {statusLabels[status]}
          </span>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted/40 rounded-lg border p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{details.name}</h3>

                <p className="text-muted-foreground mt-1 text-sm">{details.description}</p>
              </div>

              {subscription?.currentPeriodEnd && (
                <div className="text-left sm:text-right">
                  <p className="text-muted-foreground text-xs">Current period ends</p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(subscription.currentPeriodEnd)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium">Included features</h3>

            <ul className="text-muted-foreground mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {details.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="bg-primary size-1.5 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {subscription?.currentPeriodStart && (
            <div className="border-border border-t pt-5">
              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Period started</dt>
                  <dd className="mt-1 font-medium">
                    {formatDate(subscription.currentPeriodStart)}
                  </dd>
                </div>

                <div>
                  <dt className="text-muted-foreground">Period ends</dt>
                  <dd className="mt-1 font-medium">{formatDate(subscription.currentPeriodEnd)}</dd>
                </div>
              </dl>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-xs leading-5">
        Subscription management is currently handled within the application for this demo
        environment.
      </p>
    </div>
  );
}
