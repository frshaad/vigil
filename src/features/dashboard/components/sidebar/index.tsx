'use client';

import {
  IconActivityHeartbeat,
  IconBell,
  IconLayoutDashboard,
  IconMenu2,
  IconSettings,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import SidebarNavigation from './navigation';
import type { NavItem } from './navigation';
import SidebarUser from './user';

const primaryNav: NavItem[] = [
  {
    label: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Monitors',
    icon: IconActivityHeartbeat,
    href: '/dashboard/monitors',
    match: 'prefix',
  },
  {
    label: 'Notifications',
    icon: IconBell,
    href: '/dashboard/notifications',
    badge: 0,
  },
];

const secondaryNav: NavItem[] = [
  {
    label: 'Settings',
    icon: IconSettings,
    href: '/dashboard/settings/profile',
    match: 'prefix',
  },
];

interface SidebarUserData {
  name: string;
  email: string;
  image?: string | null;
}

interface SidebarContentProps {
  unreadNotificationCount: number;
  user: SidebarUserData;
  onNavigate: () => void;
}

function SidebarBrand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-1">
      <span className="border-border bg-muted/50 flex size-9 shrink-0 items-center justify-center rounded-lg border">
        <Logo className="size-5" />
      </span>

      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-foreground text-sm font-semibold tracking-tight">Vigil</span>

        <span className="text-muted-foreground truncate text-xs">Website Monitoring</span>
      </span>
    </Link>
  );
}

function SidebarContent({ unreadNotificationCount, user, onNavigate }: SidebarContentProps) {
  const navigationItems = primaryNav.map((item) =>
    item.label === 'Notifications'
      ? {
          ...item,
          badge: unreadNotificationCount,
        }
      : item,
  );

  return (
    <div className="flex h-full flex-col p-3">
      <SidebarBrand />

      <Separator className="my-4" />

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <SidebarNavigation label="Platform" items={navigationItems} onNavigate={onNavigate} />

        <SidebarNavigation label="Account" items={secondaryNav} onNavigate={onNavigate} />
      </nav>

      <div className="pt-4">
        <SidebarUser user={user} />
      </div>
    </div>
  );
}

interface DashboardSidebarProps {
  unreadNotificationCount: number;
  user: SidebarUserData;
}

export default function DashboardSidebar({ unreadNotificationCount, user }: DashboardSidebarProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Desktop */}
      <aside className="border-border bg-sidebar sticky top-0 hidden h-screen w-65 shrink-0 border-r lg:block">
        <SidebarContent
          unreadNotificationCount={unreadNotificationCount}
          user={user}
          onNavigate={handleNavigate}
        />
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
              user={user}
              onNavigate={handleNavigate}
            />
          </SheetContent>
        </Sheet>

        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="size-5" />

          <span className="text-foreground text-sm font-semibold tracking-tight">Vigil</span>
        </Link>
      </header>
    </>
  );
}
