import { IconLock, IconPassword } from '@tabler/icons-react';
import type { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChangePasswordForm from '@/features/auth/components/change-password-form';
import SessionsSection from '@/features/auth/components/sessions-section';

export const metadata: Metadata = {};

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
