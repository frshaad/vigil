'use client';

import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ApplicationErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ApplicationError({ error, reset }: ApplicationErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center px-6 py-10 text-center">
          <div className="bg-destructive/10 flex size-10 items-center justify-center rounded-full">
            <IconAlertTriangle className="text-destructive size-5" stroke={1.75} />
          </div>

          <h1 className="mt-4 text-base font-semibold">Something went wrong</h1>

          <p className="text-muted-foreground mt-2 text-sm leading-6">
            We couldn’t load this part of Vigil. Try again, and if the problem continues, refresh
            the page.
          </p>

          <Button type="button" className="mt-6" onClick={reset}>
            <IconRefresh />
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
