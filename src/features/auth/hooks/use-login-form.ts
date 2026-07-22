'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';
import { getCallbackURL } from '@/lib/helpers/url';

import { DEFAULT_ERROR_MESSAGE } from '../constants';
import type { LoginInput } from '../types';
import { loginInputSchema } from '../validations';

export function useLoginForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const redirectUrl = getCallbackURL(useSearchParams());

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setError(null);
    startTransition(async () => {
      try {
        await authClient.signIn.email(data, {
          onError(ctx) {
            if (ctx.error.status === 403) {
              setError('Please verify your email address');
            }
            setError(ctx.error.message);
          },
          onSuccess() {
            toast.success('Welcome back!');
            router.push(redirectUrl as Route);
          },
        });
      } catch {
        setError(DEFAULT_ERROR_MESSAGE);
      }
    });
  });

  const lastMethod = authClient.getLastUsedLoginMethod();
  const togglePasswordVisibility = () => setShowPassword((c) => !c);

  return {
    control: form.control,
    handleSubmit,
    isPending,
    error,
    lastMethod,
    showPassword,
    togglePasswordVisibility,
  };
}
