import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE, INVALID_LINK_MESSAGE } from '../constants';
import type { ResetPasswordInput } from '../types';
import { resetPasswordInputSchema } from '../validations';

export function useResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((c) => !c);

  const isInvalidToken = useMemo(() => {
    return token === null || token === '';
  }, [token]);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordInputSchema),
    defaultValues: { newPassword: '' },
  });

  useEffect(() => {
    form.setFocus('newPassword');
  }, [form]);

  const handleSubmit = form.handleSubmit(({ newPassword }) => {
    if (isInvalidToken) {
      setError(INVALID_LINK_MESSAGE);
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        await authClient.resetPassword(
          { newPassword, token: token as string },
          {
            onError(ctx) {
              setError(ctx.error.message);
            },
            onSuccess() {
              form.reset();
              router.replace('/login');
            },
          }
        );
      } catch {
        setError(DEFAULT_ERROR_MESSAGE);
      }
    });
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
