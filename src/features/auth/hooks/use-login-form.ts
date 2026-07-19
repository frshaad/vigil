'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { loginInputSchema } from '../validations';

export function useLoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const callbackURL = (redirectUrl !== '' && redirectUrl !== null ? redirectUrl : '/') as Route;

  const form = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await authClient.signIn.email(data);

        if (result.error) {
          setError(result.error.message ?? 'Something went wrong');
        } else {
          toast.success('Welcome back!');
          router.push(callbackURL);
        }
      } catch {
        setError('An unexpected error occurred');
      }
    });
  });

  const lastMethod = authClient.getLastUsedLoginMethod();
  const togglePasswordVisibility = () => setPasswordVisible((c) => !c);

  return {
    control: form.control,
    handleSubmit,
    isPending,
    error,
    lastMethod,
    passwordVisible,
    togglePasswordVisibility,
  };
}
