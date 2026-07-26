'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';

import { useChangePassword } from '../hooks/use-change-password';
import AuthError from './auth-error';
import PasswordField from './password-field';

export default function ChangePasswordForm() {
  const {
    control,
    error,
    handleSubmit,
    isPending,
    showCurrentPassword,
    showNewPassword,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
  } = useChangePassword();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <FieldGroup className="gap-4">
        <PasswordField
          name="currentPassword"
          control={control}
          label="Current password"
          visible={showCurrentPassword}
          onToggle={toggleCurrentPasswordVisibility}
          autoComplete="current-password"
        />

        <PasswordField
          name="newPassword"
          control={control}
          label="New password"
          visible={showNewPassword}
          onToggle={toggleNewPasswordVisibility}
          autoComplete="new-password"
        />

        <PasswordField
          name="confirmNewPassword"
          control={control}
          label="Confirm New password"
          visible={showNewPassword}
          onToggle={toggleNewPasswordVisibility}
          autoComplete="new-password"
        />

        <Field className="relative mt-3" aria-disabled={isPending}>
          <Button type="submit" disabled={isPending} className="max-w-fit">
            Change password
          </Button>
        </Field>

        <AuthError message={error} />
      </FieldGroup>
    </form>
  );
}
