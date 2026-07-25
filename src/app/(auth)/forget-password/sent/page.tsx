import { IconMailSpark } from '@tabler/icons-react';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BackToLoginButton from '@/features/auth/components/back-to-login-button';

export default function ForgetPasswordRequestPageSent() {
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
