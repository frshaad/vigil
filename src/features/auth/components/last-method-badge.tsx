import { IconHistory } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';

export default function LastUsedMethodBadge() {
  return (
    <Badge className="absolute -top-2 -right-2 max-w-fit" variant="secondary">
      <IconHistory className="size-3" />
      Last used
    </Badge>
  );
}
