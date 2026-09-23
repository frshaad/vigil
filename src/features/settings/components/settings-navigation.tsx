'use client';

import { IconBell, IconCreditCard, IconShieldLock, IconUser } from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type SettingsItem = {
  label: string;
  description: string;
  icon: Icon;
  href: Route;
};

const settingsItems: SettingsItem[] = [
  {
    label: 'Profile',
    description: 'Personal information',
    icon: IconUser,
    href: '/dashboard/settings/profile',
  },
  {
    label: 'Security',
    description: 'Password and sessions',
    icon: IconShieldLock,
    href: '/dashboard/settings/security',
  },
  {
    label: 'Notifications',
    description: 'Alert delivery',
    icon: IconBell,
    href: '/dashboard/settings/notifications',
  },
  {
    label: 'Billing',
    description: 'Subscription and plan',
    icon: IconCreditCard,
    href: '/dashboard/settings/billing',
  },
];

export default function SettingsNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full shrink-0 lg:w-56">
      <div className="flex gap-1 overflow-x-auto lg:flex-col">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex min-w-fit items-center gap-3 rounded-md px-3 py-2.5 outline-none transition-colors',
                'focus-visible:ring-2 focus-visible:ring-ring/50',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon size={18} stroke={1.75} className="shrink-0" />

              <span className="flex flex-col">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="hidden text-xs lg:block">{item.description}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
