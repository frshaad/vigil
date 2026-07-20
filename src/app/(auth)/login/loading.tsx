import { IconEye } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AuthCard from '@/features/auth/components/auth-card';

export default function LoginLoading() {
  return (
    <AuthCard title="Login" description="Enter your information below to login">
      <div className="flex flex-col gap-7">
        <form>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input disabled />
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <div className="relative">
                <Input className="pr-9" disabled />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-0 right-0 hover:bg-transparent dark:hover:bg-transparent"
                  disabled
                >
                  <IconEye className="size-4" />
                </Button>
              </div>
            </Field>

            <Field orientation="horizontal">
              <Checkbox disabled />
              <FieldLabel className="font-normal">Remember me</FieldLabel>
            </Field>

            <Field className="mt-3">
              <Button disabled>
                <span>Sign In with Email</span>
              </Button>
            </Field>
          </FieldGroup>
        </form>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>

        <FieldGroup>
          <Field>
            <Button variant="outline" className="relative w-full" disabled>
              <span className="flex items-center">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                </span>{' '}
                Continue with
                <span className="ml-1 capitalize">Google</span>
              </span>
            </Button>

            <Button variant="outline" className="relative w-full" disabled>
              <span className="flex items-center">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      fill="currentColor"
                    />
                  </svg>
                </span>{' '}
                Continue with
                <span className="ml-1 capitalize">GitHub</span>
              </span>
            </Button>
          </Field>
        </FieldGroup>

        <FieldDescription className="text-center">
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </FieldDescription>
      </div>
    </AuthCard>
  );
}
