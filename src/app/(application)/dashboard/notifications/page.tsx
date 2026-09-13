import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import NotificationsPage from '@/features/notifications/components/notifications-page';
import { getNotificationChannels } from '@/features/notifications/dal';
import { getCurrentUserOrRedirect } from '@/lib/auth/session';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Notifications',
  description: 'See all your notifications in one place.',
  noIndex: true,
});

export default async function Page() {
  const user = await getCurrentUserOrRedirect();

  if (!user) {
    redirect('/login');
  }

  const channels = await getNotificationChannels(user.id);

  return <NotificationsPage channels={channels} />;
}
