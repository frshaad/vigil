'use client';

import { IconBell, IconCircleCheck, IconCircleX, IconInfoCircle } from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import {
  markAllInAppNotificationsAsRead,
  markInAppNotificationAsRead,
} from '../actions/notification-read-actions';

interface Notification {
  id: string;
  type: 'MONITOR_DOWN' | 'MONITOR_RECOVERED';
  title: string;
  message: string;
  monitorId: string | null;
  createdAt: string;
}

interface NotificationBellClientProps {
  initialNotifications: Notification[];
  initialUnreadCount: number;
}

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'MONITOR_DOWN':
      return IconCircleX;

    case 'MONITOR_RECOVERED':
      return IconCircleCheck;
  }
}

function formatNotificationTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function NotificationBellClient({
  initialNotifications,
  initialUnreadCount,
}: NotificationBellClientProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);

  const [isPending, startTransition] = useTransition();

  const handleMarkAllAsRead = () => {
    if (unreadCount === 0) {
      return;
    }

    const previousNotifications = notifications;
    const previousUnreadCount = unreadCount;

    setNotifications([]);
    setUnreadCount(0);

    startTransition(async () => {
      const result = await markAllInAppNotificationsAsRead();

      if (result.serverError || result.validationErrors) {
        setNotifications(previousNotifications);
        setUnreadCount(previousUnreadCount);
      }
    });
  };

  const handleNotificationClick = (notificationId: string) => {
    const notification = notifications.find((item) => item.id === notificationId);

    if (!notification) {
      return;
    }

    setNotifications((current) => current.filter((item) => item.id !== notificationId));

    setUnreadCount((current) => Math.max(0, current - 1));

    startTransition(async () => {
      const result = await markInAppNotificationAsRead({
        notificationId,
      });

      if (result.serverError || result.validationErrors) {
        setNotifications((current) => [notification, ...current]);
        setUnreadCount((current) => current + 1);
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={unreadCount > 0 ? `${unreadCount} unread notifications` : 'Notifications'}
          />
        }
      >
        <IconBell />

        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="bg-destructive text-destructive-foreground absolute top-1 right-1 flex min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-4 font-medium"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent align="end" className="w-[min(360px,calc(100vw-2rem))] overflow-hidden p-0">
        <div className="flex items-center justify-between gap-4 border-b px-4 py-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold">Notifications</h2>

            <p className="text-muted-foreground text-xs">Recent monitor activity</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            disabled={unreadCount === 0 || isPending}
            onClick={handleMarkAllAsRead}
          >
            Mark all read
          </Button>
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <div className="bg-muted flex size-10 items-center justify-center rounded-full">
              <IconInfoCircle className="text-muted-foreground size-5" />
            </div>

            <p className="mt-3 text-sm font-medium">You&apos;re all caught up</p>

            <p className="text-muted-foreground mt-1 text-xs">
              New monitor alerts will appear here.
            </p>
          </div>
        ) : (
          <div className="max-h-105 overflow-y-auto">
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);

              const content = (
                <div className="hover:bg-muted/50 flex gap-3 px-4 py-3 transition-colors">
                  <div className="bg-muted mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full">
                    <Icon className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-5 font-medium">{notification.title}</p>

                    <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs leading-5">
                      {notification.message}
                    </p>

                    <p className="text-muted-foreground mt-1 text-[11px]">
                      {formatNotificationTime(notification.createdAt)}
                    </p>
                  </div>
                </div>
              );

              if (!notification.monitorId) {
                return (
                  <div key={notification.id} className="border-b last:border-b-0">
                    {content}
                  </div>
                );
              }

              return (
                <Link
                  key={notification.id}
                  href={`dashboard/monitors/${notification.monitorId}` as Route}
                  className="block border-b last:border-b-0"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
