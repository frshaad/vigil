import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { DEFAULT_ERROR_MESSAGE } from '../constants';
import type { ChangePasswordInput } from '../types';
import { changePasswordInputSchema } from '../validations';

export function useChangePassword() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => setShowCurrentPassword((c) => !c);
  const toggleNewPasswordVisibility = () => setShowNewPassword((c) => !c);

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordInputSchema),
    defaultValues: { newPassword: '', currentPassword: '', confirmNewPassword: '' },
  });

  const handleSubmit = form.handleSubmit(async ({ currentPassword, newPassword }) => {
    try {
      await authClient.changePassword(
        { currentPassword, newPassword, revokeOtherSessions: true },
        {
          onRequest() {
            setError(null);
            form.clearErrors();
            setIsPending(true);
          },
          onSuccess() {
            form.reset();
            toast.success('Password changed successfully.');
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
    showCurrentPassword,
    showNewPassword,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
  };
}
