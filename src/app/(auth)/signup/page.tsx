import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import AuthCard from '@/features/auth/components/auth-card';
import SignupForm from '@/features/auth/components/signup-form';
import { getSession } from '@/lib/auth/session';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Create an Account',
  description: 'Sign up to start monitoring your services in minutes.',
  noIndex: true,
});

export default async function SignupPage() {
  const session = await getSession();
  if (session) {
    redirect('/');
  }

  return (
    <AuthCard
      title="Create an account"
      description="Enter your information below to create an account"
    >
      <SignupForm />
    </AuthCard>
  );
}
