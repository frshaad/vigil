'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth/client';

interface ProfileFormProps {
  initialName: string;
  email: string;
  image?: string | null;
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

export default function ProfileForm({ initialName, email, image }: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const hasChanges = name.trim() !== initialName;
  const isValid = name.trim().length >= 2;

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextName = name.trim();

    if (!isValid || !hasChanges) {
      return;
    }

    setError(null);
    setIsPending(true);

    try {
      const { error: updateError } = await authClient.updateUser({
        name: nextName,
      });

      if (updateError) {
        setError(updateError.message || 'Unable to update your profile.');
        return;
      }

      toast.success('Profile updated successfully.');
    } catch {
      setError('Unable to update your profile.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="border-border rounded-lg border">
      <form onSubmit={(e) => void handleSubmit(e)}>
        <div className="space-y-6 p-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src={image ?? undefined} alt="" />
              <AvatarFallback className="text-sm">{getInitials(name)}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium">{name || 'Your name'}</p>

              <p className="text-muted-foreground text-sm">
                Your profile information is used throughout Vigil.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-name">Name</Label>

            <Input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              maxLength={100}
            />

            <p className="text-muted-foreground text-xs">
              This name is displayed in your Vigil account.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>

            <Input id="profile-email" value={email} readOnly disabled />

            <p className="text-muted-foreground text-xs">
              Email address is managed by your authentication account.
            </p>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>

        <div className="bg-muted/30 border-t px-6 py-4">
          <Button type="submit" disabled={!hasChanges || !isValid || isPending}>
            {isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
