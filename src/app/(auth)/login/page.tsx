import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import AuthCard from '@/features/auth/components/auth-card';
import LoginForm from '@/features/auth/components/login-form';
import { getCurrentSession } from '@/lib/auth/session';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Login',
  description: 'Log in to your Vigil account to access your dashboard.',
  noIndex: true,
});

function LoginFormFallback() {
  return (
    <div className="flex flex-col gap-7">
      <div className="bg-muted h-24 animate-pulse" />
      <div className="flex flex-col gap-4">
        <div className="bg-muted h-9 animate-pulse" />
        <div className="bg-muted h-9 animate-pulse" />
        <div className="bg-muted h-4 w-24 animate-pulse" />
        <div className="bg-muted h-9 animate-pulse" />
      </div>
      <div className="bg-muted h-px w-full" />
      <div className="bg-muted h-9 animate-pulse" />
    </div>
  );
}

export default async function LoginPage() {
  const session = await getCurrentSession();

  if (session) {
    redirect('/');
  }

  return (
    <AuthCard title="Login" description="Enter your information below to login">
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
