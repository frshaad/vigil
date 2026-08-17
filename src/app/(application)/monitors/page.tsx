import { IconPlus } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import MonitorList from '@/features/monitors/components/monitor-list';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Monitors',
  description: 'Manage your monitors and their settings.',
  noIndex: true,
});

export default function MonitorsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Monitors</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Monitor your websites and APIs and get notified when they go down.
          </p>
        </div>

        <Button nativeButton={false} render={<Link href="/monitors/new" />}>
          <IconPlus />
          Add monitor
        </Button>
      </header>

      <Suspense fallback={'Loading...'}>
        <MonitorList />
      </Suspense>
    </div>
  );
}
