import Link from 'next/link';

import { Button } from '@/components/ui/button';
import LogOutButton from '@/features/auth/components/logout-button';
import { authClient } from '@/lib/auth/client';

export default function HeaderActions() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {session ? (
        <LogOutButton variant="ghost" size="sm" doNotRedirectToLogin />
      ) : (
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />}>
          Sign In
        </Button>
      )}

      <Button
        size="sm"
        nativeButton={false}
        render={<Link href={session ? '/dashboard' : '/signup'} />}
      >
        {session ? 'Dashboard' : 'Get Started'}
      </Button>
    </div>
  );
}
