import type { Metadata } from 'next';
import Link from 'next/link';

import Logo from '@/components/logo';
import ChangePasswordForm from '@/features/auth/components/change-password-form';
import LogOutButton from '@/features/auth/components/logout-button';
import VerifyEmailNotice from '@/features/auth/components/verify-email-notice';
import { getSession } from '@/lib/auth/session';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Dashboard',
  description: 'Your dashboard for managing your account and settings.',
  noIndex: true,
});

export default async function DashboardPage() {
  const session = await getSession();

  const isEmailVerified = session?.user.emailVerified;

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Logo />
      <h2>{session === null ? 'No User' : session.user.email}</h2>
      {isEmailVerified === false && <VerifyEmailNotice />}
      {session === null ? <Link href="/login">Log In</Link> : <LogOutButton />}
      <hr />
      <ChangePasswordForm />
    </div>
  );
}
