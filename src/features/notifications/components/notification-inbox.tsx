'use client';

import { IconCircleX, IconCircleCheck, IconInfoCircle, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import {
  markAllInAppNotificationsAsRead,
  markInAppNotificationAsRead,
} from '../actions/notification-read-actions';
import type { InAppNotification } from '../dal';
import { formatNotificationTime } from '../format';

type Filter = 'all' | 'unread';

interface NotificationInboxProps {
  notifications: InAppNotification[];
  unreadCount: number;
}

function NotificationIcon({ type }: { type: InAppNotification['type'] }) {
  if (type === 'MONITOR_DOWN') {
    return <IconCircleX className="text-destructive size-5" stroke={1.75} />;
  }

  if (type === 'MONITOR_RECOVERED') {
    return <IconCircleCheck className="text-success size-5" stroke={1.75} />;
  }

  return <IconInfoCircle className="text-muted-foreground size-5" stroke={1.75} />;
}

export default function NotificationInbox({
  notifications: initialNotifications,
  unreadCount: initialUnreadCount,
}: NotificationInboxProps) {
  const router = useRouter();

  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [filter, setFilter] = useState<Filter>('all');

  const [isPending, startTransition] = useTransition();

  const visibleNotifications =
    filter === 'unread'
      ? notifications.filter((notification) => notification.readAt === null)
      : notifications;

  const markAsRead = (notificationId: string) => {
    const notification = notifications.find((item) => item.id === notificationId);

    if (!notification || notification.readAt !== null) {
      return;
    }

    startTransition(async () => {
      const result = await markInAppNotificationAsRead({
        notificationId,
      });

      if (result.serverError || result.validationErrors) {
        return;
      }

      const readAt = new Date();

      setNotifications((current) =>
        current.map((item) =>
          item.id === notificationId
            ? {
                ...item,
                readAt,
              }
            : item,
        ),
      );

      setUnreadCount((count) => Math.max(0, count - 1));

      router.refresh();
    });
  };

  const markAllAsRead = () => {
    if (unreadCount === 0) {
      return;
    }

    startTransition(async () => {
      const result = await markAllInAppNotificationsAsRead();

      if (result.serverError || result.validationErrors) {
        return;
      }

      const readAt = new Date();

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          readAt: notification.readAt ?? readAt,
        })),
      );

      setUnreadCount(0);

      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>

          <p className="text-muted-foreground mt-1 text-sm">
            Stay up to date with alerts from your monitors.
          </p>
        </div>

        <Button
          variant="outline"
          nativeButton={false}
          render={
            <Link href="/dashboard/settings/notifications">
              <IconSettings />
              Notification settings
            </Link>
          }
        />
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            size="sm"
            variant={filter === 'all' ? 'secondary' : 'ghost'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>

          <Button
            type="button"
            size="sm"
            variant={filter === 'unread' ? 'secondary' : 'ghost'}
            onClick={() => setFilter('unread')}
          >
            Unread
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground ml-1 rounded-full px-1.5 text-[10px] leading-5 font-semibold">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={unreadCount === 0 || isPending}
          onClick={markAllAsRead}
        >
          Mark all as read
        </Button>
      </div>

      {visibleNotifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-14 text-center">
            <div className="bg-muted flex size-10 items-center justify-center rounded-full">
              <IconCircleCheck className="text-muted-foreground size-5" stroke={1.75} />
            </div>

            <h2 className="mt-4 text-sm font-medium">
              {filter === 'unread' ? 'You’re all caught up' : 'No notifications yet'}
            </h2>

            <p className="text-muted-foreground mt-1 max-w-sm text-sm">
              {filter === 'unread'
                ? 'There are no unread notifications.'
                : 'Notifications from your monitors will appear here.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {visibleNotifications.map((notification) => {
            const isUnread = notification.readAt === null;

            return (
              <Card
                key={notification.id}
                className={cn(
                  'transition-colors',
                  isUnread
                    ? 'border-primary/30 bg-primary/[0.035] shadow-sm'
                    : 'border-border/70 bg-muted/12',
                )}
              >
                <CardContent
                  className={cn(
                    'relative flex gap-4 p-4',
                    isUnread &&
                      'before:bg-primary before:absolute before:inset-y-3 before:left-0 before:w-0.5 before:rounded-r-full',
                  )}
                >
                  <div
                    className={cn(
                      'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full',
                      isUnread ? 'bg-background' : 'bg-muted',
                    )}
                  >
                    <NotificationIcon type={notification.type} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {isUnread && (
                            <span
                              className="bg-primary size-2 shrink-0 rounded-full"
                              aria-label="Unread"
                            />
                          )}

                          <h2
                            className={cn(
                              'truncate text-sm',
                              isUnread
                                ? 'text-foreground font-semibold'
                                : 'text-muted-foreground font-medium',
                            )}
                          >
                            {notification.title}
                          </h2>
                        </div>

                        {notification.monitorId ? (
                          <Link
                            href={`/dashboard/monitors/${notification.monitorId}`}
                            className={cn(
                              'mt-1 inline-block text-xs hover:underline',
                              isUnread ? 'text-primary' : 'text-muted-foreground',
                            )}
                          >
                            {notification.monitor?.name ?? 'View monitor'}
                          </Link>
                        ) : (
                          <span className="text-muted-foreground mt-1 inline-block text-xs">
                            Vigil
                          </span>
                        )}
                      </div>

                      <time
                        dateTime={notification.createdAt.toISOString()}
                        className="text-muted-foreground shrink-0 text-xs"
                      >
                        {formatNotificationTime(notification.createdAt)}
                      </time>
                    </div>

                    <p
                      className={cn(
                        'mt-2 text-sm leading-6',
                        isUnread ? 'text-foreground/80' : 'text-muted-foreground',
                      )}
                    >
                      {notification.message}
                    </p>

                    {isUnread && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="mt-2 px-0"
                        disabled={isPending}
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
