'use client';

import { IconLock } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';

import { useResetPassword } from '../hooks/use-reset-password';
import AuthCard from './auth-card';
import AuthError from './auth-error';
import BackToLoginButton from './back-to-login-button';
import PasswordField from './password-field';

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
            <PasswordField
              name="newPassword"
              control={control}
              label="New Password"
              visible={showPassword}
              onToggle={togglePasswordVisibility}
              autoComplete="new-password"
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
