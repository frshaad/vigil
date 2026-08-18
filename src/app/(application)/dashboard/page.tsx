import type { Metadata } from 'next';

import CreateMonitorForm from '@/features/monitors/components/create-monitor-form';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Dashboard',
  description: 'Your dashboard for managing your account and settings.',
  noIndex: true,
});

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <CreateMonitorForm />
    </div>
  );
}
