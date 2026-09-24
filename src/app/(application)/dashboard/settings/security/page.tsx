import type { Metadata } from 'next';

import ChangePasswordForm from '@/features/auth/components/change-password-form';
import SessionsSection from '@/features/auth/components/sessions-section';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Security Settings',
  description: 'Manage your password and active account sessions.',
  noIndex: true,
});

export default function SecuritySettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-medium">Security</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Manage your password and active account sessions.
        </p>
      </div>

      <section className="border-border border">
        <div className="border-b px-6 py-5">
          <h3 className="text-base font-medium">Change password</h3>

          <p className="text-muted-foreground mt-1 text-sm">
            Update your password to keep your account secure.
          </p>
        </div>

        <div className="p-6">
          <ChangePasswordForm />
        </div>
      </section>

      <section className="border-border border">
        <div className="border-b px-6 py-5">
          <h3 className="text-base font-medium">Active sessions</h3>

          <p className="text-muted-foreground mt-1 text-sm">
            Review and manage where your account is currently signed in.
          </p>
        </div>

        <div className="p-6">
          <SessionsSection />
        </div>
      </section>
    </div>
  );
}
