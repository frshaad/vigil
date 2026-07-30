import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE, INVALID_LINK_MESSAGE } from '../constants';
import type { ResetPasswordInput } from '../types';
import { resetPasswordInputSchema } from '../validations';

export function useResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((c) => !c);

  const isInvalidToken = token === null || token === '';

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordInputSchema),
    defaultValues: { newPassword: '' },
  });

  useEffect(() => {
    form.setFocus('newPassword');
  }, [form]);

  const handleSubmit = form.handleSubmit(async ({ newPassword }) => {
    if (isInvalidToken) {
      setError(INVALID_LINK_MESSAGE);
      return;
    }

    try {
      await authClient.resetPassword(
        { newPassword, token },
        {
          onRequest() {
            setError(null);
            setIsPending(true);
          },
          onError(ctx) {
            setError(ctx.error.message ?? DEFAULT_ERROR_MESSAGE);
          },
          onSuccess() {
            router.replace('/reset-password/success');
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
    isInvalidToken,
    showPassword,
    togglePasswordVisibility,
  };
}
