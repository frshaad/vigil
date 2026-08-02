import type { Metadata } from 'next';

import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Monitors',
  description: 'Manage your monitors and their settings.',
  noIndex: true,
});

export default function MonitorsPage() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1>Monitors</h1>
    </div>
  );
}
