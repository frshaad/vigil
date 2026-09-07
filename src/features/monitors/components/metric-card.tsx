import type { ReactNode } from 'react';

import { Card, CardContent } from '@/components/ui/card';

interface MetricCardProps {
  label: string;
  value: ReactNode;
  description?: ReactNode;
}

export function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-muted-foreground text-sm">{label}</p>

        <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>

        {description !== undefined && (
          <p className="text-muted-foreground mt-1 text-xs">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
