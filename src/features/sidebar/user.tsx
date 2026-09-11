'use client';

import {
  IconUser,
  IconShieldLock,
  IconPalette,
  IconCreditCard,
  IconBook,
  IconBrandGithub,
  IconLifebuoy,
  IconLogout,
  IconSelector,
} from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const accountItems = [
  { label: 'Profile', icon: IconUser },
  { label: 'Security', icon: IconShieldLock },
  { label: 'Appearance', icon: IconPalette },
  { label: 'Billing', icon: IconCreditCard },
];

const resourceItems = [
  { label: 'Documentation', icon: IconBook },
  { label: 'GitHub', icon: IconBrandGithub },
  { label: 'Support', icon: IconLifebuoy },
];

export default function SidebarUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          // oxlint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            type="button"
            className="hover:bg-muted focus-visible:ring-ring/50 aria-expanded:bg-muted flex w-full items-center gap-3 rounded-md border border-transparent px-2 py-2 text-left transition-colors outline-none focus-visible:ring-2"
          />
        }
      >
        <Avatar>
          <AvatarImage src="/professional-headshot.png" alt="" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-foreground truncate text-sm font-medium">John Doe</span>
          <span className="text-muted-foreground truncate text-xs">john@example.com</span>
        </span>
        <IconSelector size={16} stroke={1.75} className="text-muted-foreground shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" sideOffset={8} className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="flex flex-col">
              <span className="text-foreground text-sm font-medium">John Doe</span>
              <span className="text-muted-foreground text-xs font-normal">john@example.com</span>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {accountItems.map(({ label, icon: Icon }) => (
            <DropdownMenuItem key={label}>
              <Icon size={16} stroke={1.75} />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {resourceItems.map(({ label, icon: Icon }) => (
            <DropdownMenuItem key={label}>
              <Icon size={16} stroke={1.75} />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <IconLogout size={16} stroke={1.75} />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
