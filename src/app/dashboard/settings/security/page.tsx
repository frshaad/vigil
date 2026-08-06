import type { Metadata } from 'next';

import ChangePasswordForm from '@/features/auth/components/change-password-form';
import SessionsSection from '@/features/auth/components/sessions-section';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Security Settings',
  description:
    'Manage your account security settings, including changing your password and reviewing active sessions.',
  noIndex: true,
});

export default function SecuritySettingsPage() {
  return (
    <div className="lg:max-w-3xl">
      <h1 className="text-primary text-2xl font-semibold">Security</h1>

      <div className="mt-10 space-y-14">
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-medium">
            <h2>Change password</h2>
          </div>
          <ChangePasswordForm />
        </section>

        <SessionsSection />
      </div>
    </div>
  );
}
