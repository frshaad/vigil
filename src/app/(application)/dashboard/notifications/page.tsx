import type { Metadata } from 'next';

import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Notifications',
  description: 'See all your notifications in one place.',
  noIndex: true,
});

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1>Notifications </h1>
    </div>
  );
}
