'use client';

import { Button } from '@/components/ui/button';

import { useResendVerification } from '../hooks/use-resend-verification';

export default function ResendVerificationButton() {
  const { isPending, isSent, resend } = useResendVerification();

  return (
    <Button
      variant={isSent ? 'outline' : 'default'}
      onClick={() => resend()}
      disabled={isPending || isSent}
    >
      {isSent ? 'Email sent' : 'Send verification email'}
    </Button>
  );
}
