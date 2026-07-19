import { IconAlertCircle } from '@tabler/icons-react';

import { Alert } from '@/components/ui/alert';

interface AuthErrorProps {
  message: string | null;
}

export default function AuthError({ message }: AuthErrorProps) {
  if (message === null) {
    return null;
  }

  return (
    <Alert className="border-destructive/50 bg-destructive/10 text-destructive flex">
      <IconAlertCircle className="size-4" />
      <div className="text-sm font-medium">{message}</div>
    </Alert>
  );
}
