import type { Metadata } from 'next';

import LogOutButton from '@/features/auth/components/logout-button';
import { requireAuthOrRedirect } from '@/lib/auth/session';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Dashboard',
  description: 'Your dashboard for managing your account and settings.',
  noIndex: true,
});

export default async function DashboardPage() {
  const session = await requireAuthOrRedirect();

  return (
    <>
      <h2>{session.user.email}</h2>
      <LogOutButton />
    </>
  );
}
