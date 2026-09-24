import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-20" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-8 w-12" />
      </CardContent>
    </Card>
  );
}

function MonitorListCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Monitors</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="size-9 shrink-0 rounded-full" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-32 max-w-full" />
              <Skeleton className="h-3 w-48 max-w-full" />
            </div>

            <Skeleton className="hidden h-5 w-14 sm:block" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function IncidentsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Open incidents</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex items-start gap-3">
            <Skeleton className="mt-0.5 size-4 shrink-0 rounded-full" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-36 max-w-full" />
              <Skeleton className="h-3 w-52 max-w-full" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ActivityCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent activity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="size-8 shrink-0 rounded-full" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-48 max-w-full" />
              <Skeleton className="h-3 w-32 max-w-full" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        <Skeleton className="h-9 w-32" />
      </header>

      <section
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        aria-busy="true"
        aria-label="Loading dashboard"
      >
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <MonitorListCardSkeleton />
        <IncidentsCardSkeleton />
      </section>

      <ActivityCardSkeleton />
    </div>
  );
}
