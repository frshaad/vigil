import type { Metadata } from 'next';

import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Billing',
  description: 'Manage your billing information and subscription settings.',
  noIndex: true,
});

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1>Billing</h1>
    </div>
  );
}
