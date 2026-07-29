import { Item, ItemContent, ItemMedia } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

export default function SessionItemSkeleton() {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <Skeleton className="size-20" />
      </ItemMedia>

      <ItemContent>
        <Skeleton className="h-6 w-60" />
        <Skeleton className="h-4 w-60" />
        <Skeleton className="h-4 w-60" />
        <Skeleton className="h-4 w-60" />
      </ItemContent>
    </Item>
  );
}
