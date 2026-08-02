import type { Metadata } from 'next';
import { Suspense } from 'react';

import ResetPasswordForm from '@/features/auth/components/reset-password-form';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Reset Password',
  description: 'Reset your password to regain access to your account.',
  noIndex: true,
});

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
