import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function NotificationChannelSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48 max-w-full" />
        </div>

        <Skeleton className="h-5 w-16 shrink-0" />
      </CardHeader>

      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-40 max-w-full" />
        <Skeleton className="h-4 w-56 max-w-full" />
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        <Skeleton className="h-9 w-40" />
      </header>

      <section className="space-y-3" aria-busy="true" aria-label="Loading notification channels">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>

        <div className="space-y-3">
          <NotificationChannelSkeleton />
          <NotificationChannelSkeleton />
          <NotificationChannelSkeleton />
        </div>
      </section>
    </div>
  );
}
