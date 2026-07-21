'use client';

import { IconEye, IconEyeOff, IconLoader2 } from '@tabler/icons-react';
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
      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-form-identifier">Email</FieldLabel>
                <Input {...field} id="login-form-identifier" aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-form-password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="login-form-password"
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
