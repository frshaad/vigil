'use client';

import { IconLoader2 } from '@tabler/icons-react';
import Link from 'next/link';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useIsClient } from '@/hooks/use-is-client';

import { useLoginForm } from '../hooks/use-login-form';
import AuthError from './auth-error';
import LastUsedMethodBadge from './last-method-badge';
import PasswordField from './password-field';
import SocialLoginButtonGroup from './social-login-button-group';

export default function LoginForm() {
  const isClient = useIsClient();

  const {
    control,
    handleSubmit,
    isPending,
    error,
    lastMethod,
    showPassword,
    togglePasswordVisibility,
  } = useLoginForm();

  return (
    <div className="flex flex-col gap-7">
      <AuthError message={error} />
      <form onSubmit={(e) => void handleSubmit(e)}>
        <FieldGroup className="gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-form-identifier">Email</FieldLabel>
                <Input
                  {...field}
                  id="login-form-identifier"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
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
            forgotPasswordHref="/forgot-password"
          />

          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id="login-form-remember-me"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="login-form-remember-me" className="font-normal">
                  Remember me
                </FieldLabel>
              </Field>
            )}
          />

          <Field className="relative mt-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <IconLoader2 className="animate-spin" /> <span>Signing in...</span>
                </div>
              ) : (
                <span>Sign In with Email </span>
              )}
            </Button>
            {isClient && lastMethod === 'email' && <LastUsedMethodBadge />}
          </Field>
        </FieldGroup>
      </form>
      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
        Or continue with
      </FieldSeparator>
      <SocialLoginButtonGroup />
      <FieldDescription className="text-center">
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </FieldDescription>
    </div>
  );
}
