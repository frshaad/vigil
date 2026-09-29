'use client';

import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';

import ErrorCard from '@/components/error-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { setNotificationChannelMonitors } from '../actions/set-notification-channel-monitors';

type Monitor = {
  id: string;
  name: string;
  isActive: boolean;
};

type ManageChannelMonitorsDialogProps = {
  channelId: string;
  channelName: string;
  monitors: Monitor[];
  connectedMonitorIds: string[];
  onSavedAction?: () => void;
};

export default function ManageChannelMonitorsDialog({
  channelId,
  channelName,
  monitors,
  connectedMonitorIds,
  onSavedAction,
}: ManageChannelMonitorsDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(() => new Set(connectedMonitorIds));

  const { execute, isPending, result } = useAction(setNotificationChannelMonitors, {
    onSuccess: () => {
      setOpen(false);
      onSavedAction?.();
    },
  });

  function toggleMonitor(monitorId: string, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current);

      if (checked) {
        next.add(monitorId);
      } else {
        next.delete(monitorId);
      }

      return next;
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setSelectedIds(new Set(connectedMonitorIds));
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            Manage monitors
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Monitors for {channelName}</DialogTitle>

          <DialogDescription>
            Select which monitors should send alerts to this email channel.
          </DialogDescription>
        </DialogHeader>

        {monitors.length === 0 ? (
          <div className="text-muted-foreground rounded-lg border p-4 text-sm">
            You don't have any monitors yet.
          </div>
        ) : (
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {monitors.map((monitor) => (
              // oxlint-disable-next-line jsx-a11y/label-has-associated-control
              <label
                key={monitor.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border p-3"
              >
                <Checkbox
                  checked={selectedIds.has(monitor.id)}
                  onCheckedChange={(value) => {
                    toggleMonitor(monitor.id, value === true);
                  }}
                  disabled={isPending}
                />

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{monitor.name}</div>

                  <div className="text-muted-foreground text-xs">
                    {monitor.isActive ? 'Monitoring' : 'Paused'}
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}

        {result.serverError && <ErrorCard message={result.serverError} />}

        <DialogFooter>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => {
              execute({
                channelId,
                monitorIds: [...selectedIds],
              });
            }}
          >
            {isPending ? 'Saving…' : 'Save monitors'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
