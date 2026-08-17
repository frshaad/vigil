import { IconActivity } from '@tabler/icons-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { MonitorDetails } from '../dal';

type MonitorActivityCardProps = {
  monitor: MonitorDetails;
};

export default function MonitorActivityCard({ monitor: _ }: MonitorActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed px-6 py-10 text-center">
          <div className="bg-muted text-muted-foreground mb-4 flex size-10 items-center justify-center rounded-full">
            <IconActivity className="size-5" />
          </div>

          <h3 className="text-sm font-medium">No check history yet</h3>

          <p className="text-muted-foreground mt-1 max-w-sm text-sm leading-relaxed">
            Response times, uptime, and incidents will appear here once Vigil starts recording
            checks for this monitor.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
