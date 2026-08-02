import type { Metadata } from 'next';

import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Appearance Settings',
  description: 'Manage your appearance preferences and settings.',
  noIndex: true,
});

export default function AppearanceSettingsPage() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1>Appearance Settings</h1>
    </div>
  );
}
