import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function MonitorBreadcrumbs() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-2"
      nativeButton={false}
      render={<Link href="/monitors" />}
    >
      <IconArrowLeft />
      Monitors
    </Button>
  );
}
