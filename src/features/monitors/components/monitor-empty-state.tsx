import { IconActivity, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MonitorEmptyState() {
  return (
    <Card>
      <CardHeader className="items-center text-center">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
          <IconActivity className="size-6" />
        </div>

        <CardTitle className="mt-2">No monitors yet</CardTitle>

        <CardDescription className="max-w-md">
          Add your first website or API endpoint and Vigil will start checking it automatically.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">
        <Button nativeButton={false} render={<Link href="/monitors/new" />}>
          <IconPlus />
          Add your first monitor
        </Button>
      </CardContent>
    </Card>
  );
}
