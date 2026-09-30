'use client';

import { useWatch, Controller } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useChangeName } from '../hooks/use-change-name';

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
  const { form, error, handleSubmit, isPending } = useChangeName(initialName);

  const currentName = useWatch({
    control: form.control,
    name: 'newName',
  });

  const { isDirty, isValid } = form.formState;

  return (
    <div className="border-border border">
      <form onSubmit={(event) => void handleSubmit(event)}>
        <div className="space-y-6 p-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src={image ?? undefined} alt="" />

              <AvatarFallback className="text-sm">{getInitials(currentName)}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium">{currentName.trim() || 'Your name'}</p>

              <p className="text-muted-foreground text-sm">
                Your profile information is used throughout Vigil.
              </p>
            </div>
          </div>

          <FieldGroup>
            <Controller
              name="newName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-name-input">Name</FieldLabel>

                  <Input
                    {...field}
                    id="update-name-input"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={fieldState.invalid ? 'update-name-input-error' : undefined}
                    autoComplete="name"
                  />

                  {fieldState.invalid && (
                    <FieldError id="update-name-input-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

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
          <Button type="submit" disabled={!isDirty || !isValid || isPending}>
            {isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
