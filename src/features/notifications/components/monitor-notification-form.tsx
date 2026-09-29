'use client';

import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ErrorCard from '@/components/error-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field';

import { setMonitorNotificationChannels } from '../actions/set-monitor-notification-channels';

type NotificationChannel = {
  id: string;
  name: string;
  email: string;
  isEnabled: boolean;
  isConnected: boolean;
};

type MonitorNotificationFormProps = {
  monitorId: string;
  channels: NotificationChannel[];
};

export default function MonitorNotificationForm({
  monitorId,
  channels,
}: MonitorNotificationFormProps) {
  const router = useRouter();

  const initialSelectedIds = channels
    .filter((channel) => channel.isConnected)
    .map((channel) => channel.id);

  const [selectedIds, setSelectedIds] = useState(() => new Set(initialSelectedIds));
  const [savedIds, setSavedIds] = useState(() => new Set(initialSelectedIds));

  const { execute, isPending, result } = useAction(setMonitorNotificationChannels, {
    onSuccess: () => {
      setSavedIds(new Set(selectedIds));
      router.refresh();
    },
  });

  const isDirty =
    selectedIds.size !== savedIds.size || [...selectedIds].some((id) => !savedIds.has(id));

  function toggleChannel(channelId: string, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current);

      if (checked) {
        next.add(channelId);
      } else {
        next.delete(channelId);
      }

      return next;
    });
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    execute({
      monitorId,
      channelIds: [...selectedIds],
    });
  }

  return (
    <section className="border p-5">
      <div className="mb-5">
        <h2 className="text-base font-semibold">Notifications</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Choose which email channels should receive alerts for this monitor.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-6">
          <div>
            <div className="mb-2 text-sm font-medium">In-app</div>

            <div className="bg-muted/50 border px-3 py-2.5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span>Vigil notifications</span>
                <span className="text-muted-foreground text-xs">Always on</span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Email</div>

            {channels.length === 0 ? (
              <div className="bg-muted/50 border p-3">
                <p className="text-muted-foreground text-sm">
                  No email channels have been added yet.
                </p>

                <Link
                  href="/dashboard/notifications"
                  className="text-primary mt-2 inline-block text-sm font-medium underline underline-offset-4 hover:no-underline"
                >
                  Add an email channel
                </Link>
              </div>
            ) : (
              <FieldGroup className="gap-2">
                {channels.map((channel) => {
                  const checkboxId = `monitor-channel-${channel.id}`;
                  const labelId = `${checkboxId}-label`;
                  const checked = selectedIds.has(channel.id);

                  return (
                    <Field key={channel.id} orientation="horizontal" className="border px-3 py-3">
                      <Checkbox
                        id={checkboxId}
                        checked={checked}
                        disabled={isPending}
                        aria-labelledby={labelId}
                        onCheckedChange={(value) => {
                          toggleChannel(channel.id, value === true);
                        }}
                      />

                      <FieldContent className="min-w-0">
                        <FieldLabel id={labelId} htmlFor={checkboxId} className="font-normal">
                          <span className="truncate">{channel.name}</span>
                        </FieldLabel>

                        <p className="text-muted-foreground truncate text-xs">{channel.email}</p>

                        {!channel.isEnabled && (
                          <p className="text-muted-foreground text-xs">Channel disabled</p>
                        )}
                      </FieldContent>
                    </Field>
                  );
                })}
              </FieldGroup>
            )}
          </div>
        </FieldGroup>

        {result.serverError && (
          <div className="mt-4">
            <ErrorCard message={result.serverError} />
          </div>
        )}

        {channels.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isPending || !isDirty}>
              {isPending ? 'Saving…' : 'Save'}
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}
