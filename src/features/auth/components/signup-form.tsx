'use client';

import { IconEye, IconEyeOff, IconLoader2 } from '@tabler/icons-react';
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
import SocialLoginButtonGroup from './social-login-button-group';

export default function SignupForm() {
  const { control, handleSubmit, isPending, error, showPassword, togglePasswordVisibility } =
    useSignupForm();

  return (
    <div className="flex flex-col gap-7">
      <AuthError message={error} />

      <form onSubmit={handleSubmit}>
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

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form-password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="signup-form-password"
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

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form-confirm-password">Confirm Password</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="signup-form-confirm-password"
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
