import Link from 'next/link';

import { Wordmark } from '@/components/logo';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Sign in', href: '/login' },
] as const;

export default function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Wordmark />

        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end"
          aria-label="Footer"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://github.com/frshaad/vigil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            GitHub
          </a>
        </nav>

        <p className="text-muted-foreground text-xs sm:order-first sm:mr-auto sm:ml-4">© Vigil</p>
      </div>
    </footer>
  );
}
