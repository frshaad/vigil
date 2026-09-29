'use client';

import { IconMail, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import type { Monitor } from '@/../prisma/generated/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

import { deleteNotificationChannel } from '../actions/delete-notification-channel';
import { toggleNotificationChannel } from '../actions/toggle-notification-channel';
import type { NotificationChannel } from '../dal';
import ManageChannelMonitorsDialog from './manage-channel-monitors-dialog';

interface NotificationChannelCardProps {
  channel: NotificationChannel;
  monitors: Pick<Monitor, 'id' | 'name' | 'isActive'>[];
}

export default function NotificationChannelCard({
  channel,
  monitors,
}: NotificationChannelCardProps) {
  const router = useRouter();

  const [isEnabled, setIsEnabled] = useState(channel.isEnabled);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (checked: boolean) => {
    const previousValue = isEnabled;

    setIsEnabled(checked);

    startTransition(async () => {
      const result = await toggleNotificationChannel({
        channelId: channel.id,
        isEnabled: checked,
      });

      if (result.serverError || result.validationErrors) {
        setIsEnabled(previousValue);
      }
    });
  };

  const handleDelete = () => {
    setDeleteError(null);

    startTransition(async () => {
      const result = await deleteNotificationChannel({
        channelId: channel.id,
      });

      if (result.serverError || result.validationErrors) {
        setDeleteError(result.serverError ?? 'Unable to delete this notification channel.');
        return;
      }

      setDeleteDialogOpen(false);
      router.refresh();
    });
  };

  return (
    <section className="border p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="bg-muted flex size-9 shrink-0 items-center justify-center">
              <IconMail className="size-4" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold">{channel.name}</h2>

              <p className="text-muted-foreground mt-1 truncate text-sm">{channel.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-muted-foreground text-xs">
              Used by {channel._count.monitors}{' '}
              {channel._count.monitors === 1 ? 'monitor' : 'monitors'}
            </p>

            <AlertDialog
              open={deleteDialogOpen}
              onOpenChange={(open) => {
                setDeleteDialogOpen(open);

                if (open) {
                  setDeleteError(null);
                }
              }}
            >
              <AlertDialogTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isPending}
                    className="text-destructive hover:text-destructive"
                  />
                }
              >
                <IconTrash />
                Delete
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete notification channel?</AlertDialogTitle>

                  <AlertDialogDescription>
                    This will permanently delete the <strong>{channel.name}</strong> email channel
                    and disconnect it from all monitors. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                {deleteError && (
                  <p className="text-destructive text-sm" role="alert">
                    {deleteError}
                  </p>
                )}

                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    variant="destructive"
                    disabled={isPending}
                    onClick={(event) => {
                      event.preventDefault();
                      handleDelete();
                    }}
                  >
                    {isPending ? 'Deleting…' : 'Delete channel'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Switch
              checked={isEnabled}
              disabled={isPending}
              onCheckedChange={handleToggle}
              aria-label={`Toggle ${channel.name}`}
            />
          </div>
        </div>

        <div className="border-t pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-medium">Monitors ({channel.monitors.length})</h3>

              <p className="text-muted-foreground mt-0.5 text-xs">
                Monitors connected to this email channel.
              </p>
            </div>

            <ManageChannelMonitorsDialog
              channelId={channel.id}
              channelName={channel.name}
              monitors={monitors}
              connectedMonitorIds={channel.monitors.map((monitor) => monitor.id)}
              onSavedAction={() => {
                router.refresh();
              }}
            />
          </div>

          {channel.monitors.length > 0 ? (
            <div className="mt-3 space-y-2">
              {channel.monitors.map((monitor) => (
                <div
                  key={monitor.id}
                  className="bg-muted/50 flex items-center justify-between gap-3 border px-3 py-2"
                >
                  <span className="truncate text-sm">{monitor.name}</span>

                  <span className="text-muted-foreground shrink-0 text-xs">
                    {monitor.isActive ? 'Active' : 'Paused'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground mt-3 text-sm">
              This channel is not connected to any monitor.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
