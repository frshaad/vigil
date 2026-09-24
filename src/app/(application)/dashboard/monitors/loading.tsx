import MonitorListSkeleton from '@/features/monitors/components/monitor-list-skeleton';

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="bg-muted h-7 w-32 animate-pulse rounded-md" />
        <div className="bg-muted h-4 w-72 max-w-full animate-pulse rounded-md" />
      </div>

      <MonitorListSkeleton />
    </div>
  );
}
