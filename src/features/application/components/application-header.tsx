import NotificationBell from '@/features/notifications/components/notification-bell';

export default function ApplicationHeader() {
  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-end px-3 lg:px-6">
        <NotificationBell />
      </div>
    </header>
  );
}
