import { IconActivityHeartbeat, IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function MonitorNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center px-6 py-10 text-center">
          <div className="bg-muted flex size-10 items-center justify-center rounded-full">
            <IconActivityHeartbeat className="text-muted-foreground size-5" stroke={1.75} />
          </div>

          <p className="text-muted-foreground mt-4 text-xs font-medium tracking-wider uppercase">
            404
          </p>

          <h1 className="mt-1 text-base font-semibold">Monitor not found</h1>

          <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-6">
            This monitor doesn&apos;t exist or you no longer have access to it.
          </p>

          <Button
            className="mt-6"
            nativeButton={false}
            render={
              <Link href="/dashboard/monitors">
                <IconArrowLeft />
                Back to monitors
              </Link>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
