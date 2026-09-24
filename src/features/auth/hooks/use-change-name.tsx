import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';
import { changeNameInputSchema } from '../schemas/credentials';
import type { ChangeNameInput } from '../types';

export function useChangeName() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ChangeNameInput>({
    resolver: zodResolver(changeNameInputSchema),
    defaultValues: { newName: '' },
  });

  const handleSubmit = form.handleSubmit(async ({ newName }) => {
    try {
      await authClient.updateUser(
        {
          name: newName,
        },
        {
          onRequest() {
            setError(null);
            form.clearErrors();
            setIsPending(true);
          },
          onSuccess() {
            form.reset();
            toast.success('Name was successfully updated.');
          },
          onError(ctx) {
            setError(ctx.error.message ?? DEFAULT_ERROR_MESSAGE);
          },
          onResponse() {
            setIsPending(false);
          },
        },
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
