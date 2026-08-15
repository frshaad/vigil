import { IconAlertCircle } from '@tabler/icons-react';

import { Alert } from '@/components/ui/alert';

interface ErrorCardProps {
  message: string;
}

export default function ErrorCard({ message }: ErrorCardProps) {
  return (
    <Alert
      className="border-destructive/50 bg-destructive/10 text-destructive flex"
      aria-live="polite"
    >
      <IconAlertCircle className="size-4" />
      <div className="text-sm font-medium">{message}</div>
    </Alert>
  );
}
