import { IconFilterOff } from '@tabler/icons-react';

import { Card, CardContent } from '@/components/ui/card';

export default function MonitorNoResults() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted flex size-10 items-center justify-center rounded-full">
          <IconFilterOff className="text-muted-foreground size-5" stroke={1.75} />
        </div>

        <h3 className="mt-4 text-sm font-medium">No matching monitors</h3>

        <p className="text-muted-foreground mt-1 max-w-sm text-sm">
          No monitors match your current search or filters. Try broadening your search or changing
          the selected filters.
        </p>
      </CardContent>
    </Card>
  );
}
