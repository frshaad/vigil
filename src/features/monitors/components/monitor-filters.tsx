import { IconSearch, IconX } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useMonitorFilters } from '../hooks/use-monitor-filters';

export default function MonitorsFilters() {
  const [{ search, state, status }, setFilters] = useMonitorFilters();

  const hasFilters = search !== '' || status !== 'all' || state !== 'all';

  function clearFilters() {
    void setFilters({
      search: null,
      state: null,
      status: null,
    });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative min-w-0 flex-1">
        <IconSearch
          aria-hidden
          className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />

        <Input
          value={search}
          onChange={(event) => {
            void setFilters({
              search: event.target.value || null,
            });
          }}
          placeholder="Search monitors..."
          className="pl-9"
          aria-label="Search monitors"
        />
      </div>

      <Select
        value={status}
        onValueChange={(value) => {
          void setFilters({
            status: value,
          });
        }}
      >
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue>
            {status === 'all'
              ? 'All statuses'
              : status === 'UP'
                ? 'Up'
                : status === 'DOWN'
                  ? 'Down'
                  : 'Unknown'}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="UP">Up</SelectItem>
          <SelectItem value="DOWN">Down</SelectItem>
          <SelectItem value="UNKNOWN">Unknown</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={state}
        onValueChange={(value) => {
          void setFilters({
            state: value,
          });
        }}
      >
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue>
            {state === 'all' ? 'All states' : state === 'active' ? 'Active' : 'Inactive'}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All states</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button type="button" variant="ghost" onClick={clearFilters} className="shrink-0">
          <IconX />
          Clear
        </Button>
      )}
    </div>
  );
}

export function formatInterval(seconds: number) {
  if (seconds < 60) {
    return `Every ${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `Every ${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);

  return `Every ${hours}h`;
}
