'use client';

import { IconLoader2 } from '@tabler/icons-react';
import Link from 'next/link';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useSignupForm } from '../hooks/use-signup-form';
import AuthError from './auth-error';
import PasswordField from './password-field';
import SocialLoginButtonGroup from './social-login-button-group';

export default function SignupForm() {
  const { control, handleSubmit, isPending, error, showPassword, togglePasswordVisibility } =
    useSignupForm();

  return (
    <div className="flex flex-col gap-7">
      <AuthError message={error} />

      <form onSubmit={(e) => void handleSubmit(e)}>
        <FieldGroup className="gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="signup-form-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="signup-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="m@example.com"
                  autoComplete="email"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <PasswordField
            name="password"
            control={control}
            label="Password"
            visible={showPassword}
            onToggle={togglePasswordVisibility}
            autoComplete="current-password"
          />

          <PasswordField
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            visible={showPassword}
            onToggle={togglePasswordVisibility}
            autoComplete="current-password"
          />

          <Field className="mt-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <IconLoader2 className="animate-spin" /> <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
        Or continue with
      </FieldSeparator>

      <SocialLoginButtonGroup />

      <FieldDescription className="px-6 text-center">
        Already have an account? <Link href="/login">Log in</Link>
      </FieldDescription>
    </div>
  );
}
