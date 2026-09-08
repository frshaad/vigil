'use client';

import { IconArrowUpRight } from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Wordmark } from '@/components/logo';
import { cn } from '@/lib/utils';

import HeaderActions from './header-actions';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
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
          <Link
            key={'github'}
            href="https://github.com/frshaad/vigil"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <IconArrowUpRight size={14} />
          </Link>
        </nav>

        <HeaderActions />
      </div>
    </header>
  );
}
