import { Skeleton } from '@/components/ui/skeleton';

const SKELETON_ITEMS = 3;

export default function MonitorListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-9 w-full sm:w-64" />
        <Skeleton className="h-9 w-full sm:w-32" />
        <Skeleton className="h-9 w-full sm:w-32" />
      </div>

      <Skeleton className="h-4 w-28" />

      <div className="space-y-3">
        {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
          <div key={index} className="border-border border p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="size-9 shrink-0" />

              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-40 max-w-full" />
                <Skeleton className="h-3 w-64 max-w-full" />
              </div>

              <Skeleton className="hidden h-6 w-16 sm:block" />

              <Skeleton className="size-8 shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
