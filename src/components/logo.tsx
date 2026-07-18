import { Major_Mono_Display } from 'next/font/google';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const logoFont = Major_Mono_Display({ subsets: ['latin'], variable: '--font-logo', weight: '400' });

export default function Logo() {
  return (
    <Link href="/" className={cn('text-primary text-2xl', logoFont.className)}>
      Vigil
    </Link>
  );
}
