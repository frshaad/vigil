'use client';

import type { Icon } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

export type NavItem = {
  label: string;
  icon: Icon;
  href: string;
};

export function SidebarNavigationItem({
  item,
  active,
  action,
}: {
  item: NavItem;
  active: boolean;
  action: (label: string) => void;
}) {
  const Icon = item.icon;

  return (
    <li>
      <a
        href={item.href}
        aria-current={active ? 'page' : undefined}
        onClick={(e) => {
          e.preventDefault();
          action(item.label);
        }}
        className={cn(
          'group flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium outline-none transition-colors',
          'focus-visible:ring-2 focus-visible:ring-ring/50',
          active
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <Icon
          size={18}
          stroke={1.75}
          className={cn(
            'shrink-0 transition-colors',
            active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
          )}
        />
        <span className="truncate">{item.label}</span>
      </a>
    </li>
  );
}

export default function SidebarNavigation({
  label,
  items,
  activeItem,
  action,
}: {
  label: string;
  items: NavItem[];
  activeItem: string;
  action: (label: string) => void;
}) {
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
            active={activeItem === item.label}
            action={action}
          />
        ))}
      </ul>
    </div>
  );
}
