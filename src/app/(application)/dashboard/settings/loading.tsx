import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsLoading() {
  return (
    <div className="min-w-0 flex-1 space-y-2">
      <Skeleton className="h-30 w-full" />
      <Skeleton className="h-30 w-full" />
    </div>
  );
}
