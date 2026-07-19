'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth/client';

import { signupInputSchema } from '../validations';

export function useSignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(signupInputSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = form.handleSubmit((inputs) => {
    setErr(null);
    startTransition(async () => {
      try {
        const { error } = await authClient.signUp.email(inputs);

        if (error) {
          setErr(error.message ?? 'Something went wrong');
        } else {
          toast.success('Account created successfully!');
          router.push('/');
        }
      } catch {
        setErr('An unexpected error occurred');
      }
    });
  });

  const togglePasswordVisibility = () => setPasswordVisible((c) => !c);

  return {
    control: form.control,
    handleSubmit,
    isPending,
    error: err,
    passwordVisible,
    togglePasswordVisibility,
  };
}
