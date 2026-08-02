import { IconRosetteDiscountCheckFilled } from '@tabler/icons-react';
import type { Metadata } from 'next';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BackToLoginButton from '@/features/auth/components/back-to-login-button';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Password Changed Successfully',
  description: 'Your password successfully changed. Please log in again with your new password.',
  noIndex: true,
});

export default function ResetPasswordSuccessPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <IconRosetteDiscountCheckFilled className="text-primary" size={24} /> Password changed
          successfully.
        </CardTitle>
        <CardDescription>Please log in again with your new password.</CardDescription>
      </CardHeader>
      <CardFooter>
        <BackToLoginButton />
      </CardFooter>
    </Card>
  );
}
