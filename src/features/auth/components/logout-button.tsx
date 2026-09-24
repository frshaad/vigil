'use client';

import { Button } from '@/components/ui/button';

import { useLogOut } from '../hooks/use-log-out';

interface LogOutButtonProps extends React.ComponentProps<typeof Button> {
  doNotRedirectToLogin?: boolean;
}

export default function LogOutButton({
  variant = 'destructive',
  doNotRedirectToLogin = false,
  ...rest
}: LogOutButtonProps) {
  const { logOut, isPending } = useLogOut();

  return (
    <Button
      variant={variant}
      onClick={() => {
        void logOut(!doNotRedirectToLogin);
      }}
      disabled={isPending}
      {...rest}
    >
      Sign Out
    </Button>
  );
}
