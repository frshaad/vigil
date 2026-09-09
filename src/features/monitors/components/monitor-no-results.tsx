import { IconSearchOff } from '@tabler/icons-react';

export default function MonitorNoResults() {
  return (
    <div className="rounded-lg border border-dashed p-10 text-center">
      <IconSearchOff className="text-muted-foreground mx-auto size-8" />

      <h3 className="mt-3 text-sm font-semibold">No monitors found</h3>

      <p className="text-muted-foreground mt-1 text-sm">Try adjusting your search or filters.</p>
    </div>
  );
}
