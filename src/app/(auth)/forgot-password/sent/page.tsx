import { IconMailSpark } from '@tabler/icons-react';
import type { Metadata } from 'next';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BackToLoginButton from '@/features/auth/components/back-to-login-button';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Check your inbox',
  description: 'If an account exists for this email, we have sent a password reset link.',
  noIndex: true,
});

export default function ForgetPasswordRequestSentPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <IconMailSpark className="text-primary" size={24} /> Check your inbox
        </CardTitle>
        <CardDescription>
          If an account exists for this email, we've sent a password reset link.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <BackToLoginButton />
      </CardFooter>
    </Card>
  );
}
