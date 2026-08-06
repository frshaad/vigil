'use client';

import {
  IconLayoutDashboard,
  IconActivityHeartbeat,
  IconAlertTriangle,
  IconWorld,
  IconBell,
  IconChartLine,
  IconSettings,
  IconCreditCard,
  IconKey,
  IconUsers,
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
  { label: 'Dashboard', icon: IconLayoutDashboard, href: '#' },
  { label: 'Monitors', icon: IconActivityHeartbeat, href: '#' },
  { label: 'Incidents', icon: IconAlertTriangle, href: '#' },
  { label: 'Status Pages', icon: IconWorld, href: '#' },
  { label: 'Notifications', icon: IconBell, href: '#' },
  { label: 'Analytics', icon: IconChartLine, href: '#' },
];

const secondaryNav: NavItem[] = [
  { label: 'Settings', icon: IconSettings, href: '#' },
  { label: 'Billing', icon: IconCreditCard, href: '#' },
  { label: 'API Keys', icon: IconKey, href: '#' },
  { label: 'Team', icon: IconUsers, href: '#' },
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
  activeItem,
  onSelect,
}: {
  activeItem: string;
  onSelect: (label: string) => void;
}) {
  return (
    <div className="flex h-full flex-col gap-5 p-3">
      <SidebarBrand />
      <Separator />
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <SidebarNavigation
          label="Platform"
          items={primaryNav}
          activeItem={activeItem}
          action={onSelect}
        />
        <SidebarNavigation
          label="Workspace"
          items={secondaryNav}
          activeItem={activeItem}
          action={onSelect}
        />
      </nav>
      <div className="flex flex-col gap-3">
        <SidebarStatus />
        <Separator />
        <SidebarUser />
      </div>
    </div>
  );
}

export default function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [open, setOpen] = useState(false);

  const handleSelect = (label: string) => {
    setActiveItem(label);
    setOpen(false);
  };

  return (
    <>
      {/* Desktop: fixed sticky sidebar */}
      <aside className="border-border bg-sidebar sticky top-0 hidden h-screen w-65 shrink-0 border-r lg:block">
        <SidebarContent activeItem={activeItem} onSelect={handleSelect} />
      </aside>

      {/* Mobile: top bar with drawer trigger */}
      <header className="border-border bg-background/80 sticky top-0 z-30 flex h-14 items-center gap-3 border-b px-4 backdrop-blur lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={<Button variant="outline" size="icon-sm" aria-label="Open navigation" />}
          >
            <IconMenu2 size={18} stroke={1.75} />
          </SheetTrigger>
          <SheetContent side="left" className="w-70 p-0 sm:max-w-70">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SidebarContent activeItem={activeItem} onSelect={handleSelect} />
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
