'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useForgotPassword } from '../hooks/use-forgot-password';
import AuthError from './auth-error';
import BackToLoginButton from './back-to-login-button';

export default function ForgotPasswordForm() {
  const { control, handleSubmit, isPending, error } = useForgotPassword();

  return (
    <div className="flex flex-col gap-4">
      <AuthError message={error} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <FieldGroup className="gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="forgot-password-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="forgot-password-email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Field className="relative mt-3" aria-disabled={isPending}>
            <Button type="submit" disabled={isPending}>
              Send reset link
            </Button>
            <BackToLoginButton />
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
