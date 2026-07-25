import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';
import type { ChangePasswordInput } from '../types';
import { changePasswordInputSchema } from '../validations';

export function useChangePassword() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => setShowCurrentPassword((c) => !c);
  const toggleNewPasswordVisibility = () => setShowNewPassword((c) => !c);

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordInputSchema),
    defaultValues: { newPassword: '', currentPassword: '', confirmNewPassword: '' },
  });

  const handleSubmit = form.handleSubmit(({ currentPassword, newPassword }) => {
    setError(null);
    form.clearErrors();

    startTransition(async () => {
      try {
        await authClient.changePassword(
          { currentPassword, newPassword, revokeOtherSessions: true },
          {
            onError(ctx) {
              setError(ctx.error.message ?? DEFAULT_ERROR_MESSAGE);
            },
            onSuccess() {
              form.reset();
              toast.success('Password changed successfully.');
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
    showCurrentPassword,
    showNewPassword,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
  };
}
