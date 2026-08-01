import { Item, ItemContent, ItemMedia } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

export default function SessionItemSkeleton() {
  return (
    <Item variant="outline" className="items-baseline">
      <ItemMedia variant="icon">
        <Skeleton className="size-4" />
      </ItemMedia>

      <ItemContent>
        <Skeleton className="h-5 w-64" />
        <Skeleton className="h-5 w-60" />
        <Skeleton className="h-5 w-15" />
        <Skeleton className="h-5 w-40" />
      </ItemContent>
    </Item>
  );
}
