import { IconRosetteDiscountCheckFilled } from '@tabler/icons-react';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BackToLoginButton from '@/features/auth/components/back-to-login-button';

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
