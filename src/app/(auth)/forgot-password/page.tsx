import type { Metadata } from 'next';

import AuthCard from '@/features/auth/components/auth-card';
import ForgotPasswordForm from '@/features/auth/components/forgot-password-form';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Forgot Password',
  description: 'Request a password reset link to regain access to your account.',
  noIndex: true,
});

export default function ForgetPasswordRequestPage() {
  return (
    <AuthCard
      title="Reset your password"
      description="Enter your user account's verified email address and we will send you a password reset link."
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
