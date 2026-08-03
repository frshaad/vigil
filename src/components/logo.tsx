import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('size-6', className)} aria-hidden="true">
      <path
        d="M12 2.5 4 5.2v6.1c0 4.6 3.2 8.4 8 10.2 4.8-1.8 8-5.6 8-10.2V5.2L12 2.5Z"
        className="fill-primary/12 stroke-primary"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 12.4h2l1.6-3.2 1.8 5 1.4-2.6h2.2"
        className="stroke-primary"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('size-4', className)}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.79.62-3.38-1.37-3.38-1.37-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 2.5-.35c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <Logo />
      <span className="text-primary text-lg font-semibold tracking-tight">Vigil</span>
    </span>
  );
}
