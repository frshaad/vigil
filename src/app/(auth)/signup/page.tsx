import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import AuthCard from '@/features/auth/components/auth-card';
import SignupForm from '@/features/auth/components/signup-form';
import { getSession } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'Create an Account | Vigil',
  description: 'Sign up to start monitoring your services in minutes.',
};

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
