import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';
import { forgetPasswordInputSchema } from '../schemas/credentials';
import type { ForgetPasswordInput } from '../types';

export function useForgetPassword() {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ForgetPasswordInput>({
    resolver: zodResolver(forgetPasswordInputSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    form.setFocus('email');
  }, [form]);

  const handleSubmit = form.handleSubmit(async ({ email }) => {
    try {
      await authClient.requestPasswordReset(
        { email, redirectTo: '/reset-password' },
        {
          onRequest() {
            setError(null);
            setIsPending(true);
          },
          onSuccess() {
            form.reset();
            router.replace('/forget-password/sent');
          },
          onError(ctx) {
            setError(ctx.error.message ?? DEFAULT_ERROR_MESSAGE);
          },
          onResponse() {
            setIsPending(false);
          },
        }
      );
    } catch {
      setError(DEFAULT_ERROR_MESSAGE);
    }
  });

  return {
    control: form.control,
    handleSubmit,
    isPending,
    error,
  };
}
