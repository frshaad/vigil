import type { Metadata } from 'next';

import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Notifications Settings',
  description: 'Manage your notification preferences and settings.',
  noIndex: true,
});

export default function NotificationsSettingsPage() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1>Notifications Settings</h1>
    </div>
  );
}
