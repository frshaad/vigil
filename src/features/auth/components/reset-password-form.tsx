'use client';

import { IconEye, IconEyeOff, IconLock } from '@tabler/icons-react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useResetPassword } from '../hooks/use-reset-password';
import AuthCard from './auth-card';
import AuthError from './auth-error';
import BackToLoginButton from './back-to-login-button';

export default function ResetPasswordForm() {
  const {
    control,
    handleSubmit,
    isPending,
    error,
    isInvalidToken,
    showPassword,
    togglePasswordVisibility,
  } = useResetPassword();

  if (isInvalidToken) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <IconLock className="text-primary" size={24} />
            Reset link expired
          </CardTitle>
          <CardDescription>
            This reset link is invalid or has expired. Please request a new one.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <BackToLoginButton />
        </CardFooter>
      </Card>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Choose a new password for your Vigil account."
    >
      <div className="flex flex-col gap-4">
        <AuthError message={error} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <FieldGroup className="gap-4">
            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reset-password-new-password">New password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="reset-password-new-password"
                      type={showPassword ? 'text' : 'password'}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="pr-9"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      type="button"
                      className="absolute top-0 right-0 hover:bg-transparent dark:hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
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
              <Button type="submit" disabled={isPending}>
                Reset password
              </Button>
              <BackToLoginButton />
            </Field>
          </FieldGroup>
        </form>
      </div>
    </AuthCard>
  );
}
