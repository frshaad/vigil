'use client';

import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/components/ui/sonner';
import type { PropsWithRequiredChildren } from '@/types/react';

export function Providers({ children }: PropsWithRequiredChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NuqsAdapter>{children}</NuqsAdapter>
      <Toaster />
    </ThemeProvider>
  );
}
