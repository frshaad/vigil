'use client';

import type { Icon } from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export type NavItem = {
  label: string;
  icon: Icon;
  href: Route;
  badge?: number;
};

function isItemActive(item: NavItem, pathname: string) {
  if (item.href === '/dashboard') {
    return pathname === '/dashboard';
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function SidebarNavigationItem({
  item,
  active,
  action,
}: {
  item: NavItem;
  active: boolean;
  action: () => void;
}) {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? 'page' : undefined}
        onClick={action}
        className={cn(
          'group flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium outline-none transition-colors',
          'focus-visible:ring-2 focus-visible:ring-ring/50',
          active
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        <Icon
          size={18}
          stroke={1.75}
          className={cn(
            'shrink-0 transition-colors',
            active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
          )}
        />

        <span className="min-w-0 flex-1 truncate">{item.label}</span>

        {item.badge !== undefined && item.badge > 0 && (
          <span
            className={cn(
              'flex min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold leading-5',
              active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
            )}
          >
            {item.badge > 99 ? '99+' : item.badge}
          </span>
        )}
      </Link>
    </li>
  );
}

export default function SidebarNavigation({
  label,
  items,
  action,
}: {
  label: string;
  items: NavItem[];
  action: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      <p className="text-muted-foreground/70 px-3 pb-1 text-[11px] font-medium tracking-wider uppercase">
        {label}
      </p>

      <ul className="flex flex-col gap-0.5">
        {items.map((item) => (
          <SidebarNavigationItem
            key={item.label}
            item={item}
            active={isItemActive(item, pathname)}
            action={action}
          />
        ))}
      </ul>
    </div>
  );
}
