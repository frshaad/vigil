'use client';

import { Button } from '@/components/ui/button';

import { useResendVerification } from '../hooks/use-resend-verification';

export default function ResendVerificationButton() {
  const { isPending, resend } = useResendVerification();

  return (
    <Button onClick={() => resend()} disabled={isPending}>
      Send verification email
    </Button>
  );
}
