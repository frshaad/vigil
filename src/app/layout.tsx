import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Suspense } from 'react';

import { cn } from '@/lib/utils';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Vigil',
    template: '%s',
  },
  description: 'Monitor your websites, APIs and cron jobs.',
  applicationName: 'Vigil',
};

export default function RootLayout({ children }: Readonly<LayoutProps<'/'>>) {
  return (
    <html
      lang="en"
      className={cn('antialiased', 'font-sans', 'font-sans', 'font-sans', inter.variable)}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
