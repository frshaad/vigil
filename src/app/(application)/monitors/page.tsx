import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getUserMonitors } from '@/features/monitors/dal';
import { requireAuthOrRedirect } from '@/lib/auth/session';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Monitors',
  description: 'Manage your monitors and their settings.',
  noIndex: true,
});

export default async function MonitorsPage() {
  const { user } = await requireAuthOrRedirect();
  const monitors = await getUserMonitors(user.id);

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <h1>Monitors</h1>
      {monitors.map((monitor) => (
        <Button
          key={monitor.id}
          render={<Link href={`/dashboard/monitors/${monitor.id}`} />}
          nativeButton={false}
        >
          {monitor.name}
        </Button>
      ))}
    </div>
  );
}
