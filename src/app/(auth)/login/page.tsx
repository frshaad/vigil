import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import AuthCard from '@/features/auth/components/auth-card';
import LoginForm from '@/features/auth/components/login-form';
import { getSession } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'Login | Vigil',
  description: 'Log in to your Vigil account to access your dashboard.',
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect('/');
  }

  return (
    <AuthCard title="Login" description="Enter your information below to login">
      <LoginForm />
    </AuthCard>
  );
}
