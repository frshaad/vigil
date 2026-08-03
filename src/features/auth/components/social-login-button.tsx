'use client';

import { IconLoader2 } from '@tabler/icons-react';
import type { VariantProps } from 'class-variance-authority';
import type { Route } from 'next';

import type { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import type { Provider } from '@/lib/auth';

import { useSocialLogin } from '../hooks/use-social-login';
import LastUsedMethodBadge from './last-method-badge';

type Props = {
  provider: Provider;
  redirectTo?: Route;
  icon: React.ReactNode;
  label?: string;
} & React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export default function SocialSignIn({ provider, icon, label, ...props }: Props) {
  const { signIn, isPending, isProviderLastMethod } = useSocialLogin(provider);

  return (
    <Button
      variant="outline"
      type="button"
      className="relative w-full"
      onClick={() => {
        void signIn();
      }}
      disabled={isPending}
      {...props}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <IconLoader2 className="animate-spin" /> <span>Please wait...</span>
        </div>
      ) : (
        <span className="flex items-center">
          <span className="mr-2">{icon}</span> Continue with
          <span className="ml-1 capitalize">{label ?? provider}</span>
        </span>
      )}
      {isProviderLastMethod && <LastUsedMethodBadge />}
    </Button>
  );
}
