import { IconArrowLeft, IconFileOff } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center px-6 py-10 text-center">
          <div className="bg-muted flex size-10 items-center justify-center rounded-full">
            <IconFileOff className="text-muted-foreground size-5" stroke={1.75} />
          </div>

          <p className="text-muted-foreground mt-4 text-xs font-medium tracking-wider uppercase">
            404
          </p>

          <h1 className="mt-1 text-base font-semibold">Page not found</h1>

          <p className="text-muted-foreground mt-2 text-sm leading-6">
            The page you’re looking for doesn’t exist or is no longer available.
          </p>

          <Button
            className="mt-6"
            render={
              <Link href="/dashboard">
                <IconArrowLeft />
                Back to dashboard
              </Link>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
