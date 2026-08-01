import { zodResolver } from '@hookform/resolvers/zod';
import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';
import { getCallbackURL } from '@/lib/helpers/url';

import { DEFAULT_ERROR_MESSAGE } from '../constants';
import { signupInputSchema } from '../schemas/credentials';
import type { SignupInput } from '../types';

export function useSignupForm() {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const redirectUrl = getCallbackURL(useSearchParams());

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupInputSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (inputs) => {
    try {
      await authClient.signUp.email(inputs, {
        onRequest() {
          setError(null);
          setIsPending(true);
        },
        onError(ctx) {
          setError(ctx.error.message ?? DEFAULT_ERROR_MESSAGE);
        },
        onSuccess() {
          toast.success('Account created successfully!');
          router.push(redirectUrl as Route);
        },
        onResponse() {
          setIsPending(false);
        },
      });
    } catch {
      setError(DEFAULT_ERROR_MESSAGE);
    }
  });

  const togglePasswordVisibility = () => setShowPassword((c) => !c);

  return {
    control: form.control,
    handleSubmit,
    isPending,
    error,
    showPassword,
    togglePasswordVisibility,
  };
}
