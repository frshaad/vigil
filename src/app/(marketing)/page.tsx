import Link from 'next/link';

import Logo from '@/components/logo';
import ChangePasswordForm from '@/features/auth/components/change-password-form';
import LogOutButton from '@/features/auth/components/logout-button';
import { getSession } from '@/lib/auth/session';

export default async function HomePage() {
  const session = await getSession();

  return (
    <div>
      <Logo />
      <h2>{session === null ? 'No User' : session.user.email}</h2>
      {session === null ? <Link href="/login">Log In</Link> : <LogOutButton />}
      <hr />
      <ChangePasswordForm />
    </div>
  );
}
