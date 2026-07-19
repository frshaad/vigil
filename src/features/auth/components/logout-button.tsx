'use client';

import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';

import { useLogOut } from '../hooks/use-log-out';

export default function LogOutButton() {
  const { signOut, isPending } = useLogOut();
  const queryClient = useQueryClient();

  return (
    <Button
      variant="destructive"
      onClick={() => {
        queryClient.clear();
        signOut();
      }}
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
}
