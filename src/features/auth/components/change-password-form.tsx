'use client';

import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useChangePassword } from '../hooks/use-change-password';
import AuthError from './auth-error';

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
        <Controller
          name="currentPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="change-password-current-password">Current Password</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="change-password-current-password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  autoComplete="current-password"
                  className="pr-9"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  className="absolute top-0 right-0 hover:bg-transparent dark:hover:bg-transparent"
                  onClick={toggleCurrentPasswordVisibility}
                  aria-label={
                    showCurrentPassword ? 'Hide current password' : 'Show current password'
                  }
                >
                  {showCurrentPassword ? (
                    <IconEyeOff className="size-4" />
                  ) : (
                    <IconEye className="size-4" />
                  )}
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="change-password-new-password">New Password</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="change-password-new-password-confirm"
                  type={showNewPassword ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  autoComplete="new-password"
                  className="pr-9"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  className="absolute top-0 right-0 hover:bg-transparent dark:hover:bg-transparent"
                  onClick={toggleNewPasswordVisibility}
                  aria-label={showNewPassword ? 'Hide current password' : 'Show current password'}
                >
                  {showNewPassword ? (
                    <IconEyeOff className="size-4" />
                  ) : (
                    <IconEye className="size-4" />
                  )}
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmNewPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="change-password-new-password-confirm">
                Confirm New Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="change-password-new-password-confirm"
                  type={showNewPassword ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  autoComplete="new-password"
                  className="pr-9"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  className="absolute top-0 right-0 hover:bg-transparent dark:hover:bg-transparent"
                  onClick={toggleNewPasswordVisibility}
                  aria-label={showNewPassword ? 'Hide current password' : 'Show current password'}
                >
                  {showNewPassword ? (
                    <IconEyeOff className="size-4" />
                  ) : (
                    <IconEye className="size-4" />
                  )}
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
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
