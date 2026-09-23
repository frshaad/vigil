import type { Metadata } from 'next';

import ProfileForm from '@/features/auth/components/profile-form';
import { getCurrentUserOrRedirect } from '@/lib/auth/session';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Profile Settings',
  description: 'Manage your profile information.',
  noIndex: true,
});

export default async function ProfileSettingsPage() {
  const user = await getCurrentUserOrRedirect();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-medium">Profile</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Manage your personal account information.
        </p>
      </div>

      <ProfileForm initialName={user.name} email={user.email} image={user.image} />
    </div>
  );
}
