import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

export default function MonitorListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 2 }, (_, i) => i * 2).map((item) => (
        <Item variant="outline" key={item}>
          <ItemMedia
            variant="icon"
            className="bg-muted flex size-10 shrink-0 items-center justify-center"
          >
            <Skeleton className="size-5" />
          </ItemMedia>

          <ItemContent>
            <div className="group focus-visible:ring-ring min-w-0 rounded-sm outline-none focus-visible:ring-2">
              <ItemTitle className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-5 w-30" />
                <Skeleton className="h-5 w-10.5" />
                <Skeleton className="h-5 w-19" />
              </ItemTitle>

              <Skeleton className="mt-1 h-4 w-40" />
            </div>
          </ItemContent>

          <ItemActions>
            <Skeleton className="h-7 w-15" />
            <Skeleton className="h-7 w-15" />
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
