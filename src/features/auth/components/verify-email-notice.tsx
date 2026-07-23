import { IconAlertCircle } from '@tabler/icons-react';

import { Card, CardTitle, CardHeader, CardDescription, CardContent } from '@/components/ui/card';

import ResendVerificationButton from './resend-verification-button';

export default function VerifyEmailNotice() {
  return (
    <Card className="max-w-3xl items-center justify-between sm:flex-row">
      <CardHeader className="flex w-full gap-2">
        <IconAlertCircle className="text-destructive" />
        <div>
          <CardTitle className="flex">Your email address hasn't been verified.</CardTitle>
          <CardDescription>
            Some features may be unavailable until you verify your email.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="max-sm:w-full max-sm:pl-12">
        <ResendVerificationButton />
      </CardContent>
    </Card>
  );
}
