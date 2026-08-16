import { IconPointFilled } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';

type MonitorStatusBadgeProps = {
  isActive: boolean;
};

export default function MonitorStatusBadge({ isActive }: MonitorStatusBadgeProps) {
  if (!isActive) {
    return (
      <Badge variant="secondary">
        <IconPointFilled />
        Paused
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <IconPointFilled className="text-emerald-500" />
      Monitoring
    </Badge>
  );
}
