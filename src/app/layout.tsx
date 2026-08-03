import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import './globals.css';

import { cn } from '@/lib/utils';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: {
    default: 'Vigil',
    template: '%s | Vigil',
  },
  description: 'Monitor your websites, APIs and cron jobs.',
  applicationName: 'Vigil',
  openGraph: {
    siteName: 'Vigil',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
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
