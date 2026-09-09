import type { MonitorStatus } from '@/../prisma/generated/enums';
import { Badge } from '@/components/ui/badge';

interface MonitorStatusBadgeProps {
  status: MonitorStatus;
}

const statusConfig = {
  UP: {
    label: 'Up',
    className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  DOWN: {
    label: 'Down',
    className: 'border-destructive/30 bg-destructive/10 text-destructive',
  },
  UNKNOWN: {
    label: 'Unknown',
    className: 'bg-muted text-muted-foreground',
  },
} as const;

export default function MonitorStatusBadge({ status }: MonitorStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
