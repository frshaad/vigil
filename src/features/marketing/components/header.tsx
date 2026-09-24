import { IconArrowUpRight } from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';

import { Wordmark } from '@/components/logo';

import HeaderActions from './header-actions';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Header() {
  return (
    <header className="border-border/60 bg-background/75 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="Vigil home">
          <Wordmark />
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href as Route}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://github.com/frshaad/vigil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
          >
            GitHub
            <IconArrowUpRight size={14} />
          </a>
        </nav>

        <HeaderActions />
      </div>
    </header>
  );
}
