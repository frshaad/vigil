import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';
import type { PasswordResetInput } from '../types';
import { passwordResetInputSchema } from '../validations';

export function useForgetPassword() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | null>(null);

  const form = useForm<PasswordResetInput>({
    resolver: zodResolver(passwordResetInputSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    form.setFocus('email');
  }, [form]);

  const handleSubmit = form.handleSubmit(({ email }) => {
    setError(null);
    startTransition(async () => {
      try {
        await authClient.requestPasswordReset(
          { email },
          {
            onError(ctx) {
              setError(ctx.error.message);
            },
            onSuccess() {
              form.reset();
              router.replace('/password-reset/sent');
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
  };
}
