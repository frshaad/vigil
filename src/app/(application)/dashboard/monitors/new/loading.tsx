import { IconArrowLeft, IconActivity } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingNewMonitorPage() {
  return (
    <>
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" disabled>
        <IconArrowLeft />
        Loading...
      </Button>

      <div className="mb-8">
        <div className="bg-primary/10 text-primary mb-4 flex size-10 items-center justify-center rounded-lg">
          <IconActivity className="size-5" />
        </div>

        <Skeleton className="mb-2 h-8 w-48" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="mt-6 h-10 w-24" />
      </div>
    </>
  );
}
