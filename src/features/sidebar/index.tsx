'use client';

import {
  IconLayoutDashboard,
  IconActivityHeartbeat,
  IconBell,
  IconMenu2,
} from '@tabler/icons-react';
import { useState } from 'react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import SidebarNavigation from './navigation';
import type { NavItem } from './navigation';
import SidebarStatus from './status';
import SidebarUser from './user';

const primaryNav: NavItem[] = [
  { label: 'Dashboard', icon: IconLayoutDashboard, href: '/dashboard' },
  { label: 'Monitors', icon: IconActivityHeartbeat, href: '/dashboard/monitors' },
  { label: 'Notifications', icon: IconBell, href: '/dashboard/notifications' },
];

function SidebarBrand() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1">
      <span className="border-border bg-muted/50 flex size-9 items-center justify-center rounded-lg border">
        <Logo className="size-5" />
      </span>

      <span className="flex flex-col leading-tight">
        <span className="text-foreground text-sm font-semibold tracking-tight">Vigil</span>
        <span className="text-muted-foreground text-xs">Website Monitoring</span>
      </span>
    </div>
  );
}

function SidebarContent({
  unreadNotificationCount,
  onSelect,
}: {
  unreadNotificationCount: number;
  onSelect: () => void;
}) {
  const navigationItems = primaryNav.map((item) =>
    item.label === 'Notifications'
      ? {
          ...item,
          badge: unreadNotificationCount,
        }
      : item,
  );

  return (
    <div className="flex h-full flex-col gap-5 p-3">
      <SidebarBrand />

      <Separator />

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <SidebarNavigation label="Platform" items={navigationItems} action={onSelect} />
      </nav>

      <div className="flex flex-col gap-3">
        <SidebarStatus />

        <Separator />

        <SidebarUser />
      </div>
    </div>
  );
}

export default function DashboardSidebar({
  unreadNotificationCount,
}: {
  unreadNotificationCount: number;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Desktop */}
      <aside className="border-border bg-sidebar sticky top-0 hidden h-screen w-65 shrink-0 border-r lg:block">
        <SidebarContent unreadNotificationCount={unreadNotificationCount} onSelect={handleSelect} />
      </aside>

      {/* Mobile */}
      <header className="border-border bg-background/80 sticky top-0 z-30 flex h-14 items-center gap-3 border-b px-4 backdrop-blur lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={<Button variant="outline" size="icon-sm" aria-label="Open navigation" />}
          >
            <IconMenu2 size={18} stroke={1.75} />
          </SheetTrigger>

          <SheetContent side="left" className="w-70 p-0 sm:max-w-70">
            <SheetTitle className="sr-only">Navigation</SheetTitle>

            <SidebarContent
              unreadNotificationCount={unreadNotificationCount}
              onSelect={handleSelect}
            />
          </SheetContent>
        </Sheet>

        <span className="flex items-center gap-2">
          <Logo className="size-5" />
          <span className="text-foreground text-sm font-semibold tracking-tight">Vigil</span>
        </span>
      </header>
    </>
  );
}
