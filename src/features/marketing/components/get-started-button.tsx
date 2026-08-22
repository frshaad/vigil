import { IconArrowNarrowRight } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getCurrentSession } from '@/lib/auth/session';

interface GetStartedButtonProps extends React.ComponentProps<typeof Button> {
  withoutIcon?: boolean;
  label?: string;
}

export default async function GetStartedButton({
  size = 'lg',
  nativeButton = false,
  withoutIcon = false,
  label = 'Get Started',
  ...rest
}: GetStartedButtonProps) {
  const session = await getCurrentSession();

  const href = session ? '/dashboard' : '/signup';

  return (
    <Button size={size} nativeButton={nativeButton} render={<Link href={href} />} {...rest}>
      {label}
      {!withoutIcon && <IconArrowNarrowRight className="size-4" />}
    </Button>
  );
}
