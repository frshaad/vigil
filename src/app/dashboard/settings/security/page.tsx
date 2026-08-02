import { IconLock, IconPassword } from '@tabler/icons-react';
import type { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="z-10 w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2 text-2xl font-semibold">
          <IconLock />
          Security
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-20">
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-medium">
            <IconPassword />
            <h2>Change password</h2>
          </div>
          <ChangePasswordForm />
        </section>

        <SessionsSection />
      </CardContent>
    </Card>
  );
}
