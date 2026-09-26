'use client';

import { IconArrowRight, IconLoader2, IconPlayerPlay } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense, use, useRef } from 'react';
import type { ReactNode } from 'react';
import { browser } from 'react-dom';
import { Controller } from 'react-hook-form';

import ErrorCard from '@/components/error-card';
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

import { useLoginForm } from '../hooks/use-login-form';
import LastUsedMethodBadge from './last-method-badge';
import PasswordField from './password-field';
import SocialLoginButtonGroup from './social-login-button-group';

const DEMO_EMAIL = 'demo@vigil.dev';
const DEMO_PASSWORD = 'DemoPassword123!';

function BrowserOnly({ children, reason }: { children: ReactNode; reason: string }) {
  use(browser(reason));

  return children;
}

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    isPending,
    error,
    lastMethod,
    showPassword,
    togglePasswordVisibility,
  } = useLoginForm();

  const handleTryDemo = () => {
    if (isPending) {
      return;
    }

    setValue('email', DEMO_EMAIL, {
      shouldDirty: true,
      shouldValidate: false,
    });

    setValue('password', DEMO_PASSWORD, {
      shouldDirty: true,
      shouldValidate: false,
    });

    setValue('rememberMe', false, {
      shouldDirty: true,
      shouldValidate: false,
    });

    formRef.current?.requestSubmit();
  };

  return (
    <div className="flex flex-col gap-7">
      {error !== null && <ErrorCard message={error} />}

      <div className="border-primary/20 bg-primary/[0.04] p-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center">
            <IconPlayerPlay size={17} stroke={2} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium">Explore the demo</p>
            <p className="text-muted-foreground mt-0.5 text-xs leading-5">
              Skip signup and explore Vigil with sample monitors, incidents, and notifications.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="border-primary/25 bg-background hover:bg-primary hover:text-primary-foreground mt-3.5 w-full transition-colors"
          disabled={isPending}
          onClick={handleTryDemo}
        >
          {isPending ? (
            <>
              <IconLoader2 className="animate-spin" />
              Opening demo…
            </>
          ) : (
            <>
              Try Demo
              <IconArrowRight />
            </>
          )}
        </Button>
      </div>

      <form ref={formRef} onSubmit={(e) => void handleSubmit(e)}>
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
                  <IconLoader2 className="animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <span>Sign In with Email</span>
              )}
            </Button>

            <Suspense fallback={null}>
              {lastMethod === 'email' && (
                <BrowserOnly reason="Last used login method is stored in the browser.">
                  <LastUsedMethodBadge />
                </BrowserOnly>
              )}
            </Suspense>
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
