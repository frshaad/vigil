'use client';

import { IconLogout, IconSelector, IconShieldLock, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

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
import { authClient } from '@/lib/auth/client';

interface SidebarUserProps {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return '?';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function SidebarUser({ user }: SidebarUserProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message ?? 'Unable to sign out.');
        return;
      }

      router.replace('/login');
      router.refresh();
    } catch {
      toast.error('Unable to sign out.');
    } finally {
      setIsSigningOut(false);
    }
  };

  const initials = getInitials(user.name);

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
        <Avatar className="size-9 shrink-0">
          <AvatarImage src={user.image ?? undefined} alt="" />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>

        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-foreground truncate text-sm font-medium">{user.name}</span>

          <span className="text-muted-foreground truncate text-xs">{user.email}</span>
        </span>

        <IconSelector size={16} stroke={1.75} className="text-muted-foreground shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="top" sideOffset={8} className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="flex items-center gap-3">
              <Avatar className="size-9 shrink-0">
                <AvatarImage src={user.image ?? undefined} alt="" />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>

              <span className="flex min-w-0 flex-col">
                <span className="text-foreground truncate text-sm font-medium">{user.name}</span>

                <span className="text-muted-foreground truncate text-xs font-normal">
                  {user.email}
                </span>
              </span>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            render={
              <Link href="/dashboard/settings/profile">
                <IconUser size={16} stroke={1.75} />
                Profile
              </Link>
            }
          />

          <DropdownMenuItem
            render={
              <Link href="/dashboard/settings/security">
                <IconShieldLock size={16} stroke={1.75} />
                Security
              </Link>
            }
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            disabled={isSigningOut}
            onClick={() => void handleSignOut()}
          >
            <IconLogout size={16} stroke={1.75} />
            {isSigningOut ? 'Signing out…' : 'Sign out'}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
