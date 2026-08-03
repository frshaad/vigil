import type { Route } from 'next';
import { cacheLife } from 'next/cache';
import Link from 'next/link';

import { Wordmark } from '@/components/logo';

const links = [
  { label: 'Product', href: '#features' },
  { label: 'GitHub', href: 'https://github.com/frshaad/vigil' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export default async function Footer() {
  'use cache';
  cacheLife('max');

  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <Wordmark />
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          aria-label="Footer"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href as Route}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Vigil</p>
      </div>
    </footer>
  );
}
