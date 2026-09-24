import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { GithubIcon } from '@/components/logo';
import { Button } from '@/components/ui/button';

import DashboardPreview from './dashboard-preview';
import GetStartedButton from './get-started-button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-175 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_62%)]"
      />

      <div className="mx-auto max-w-6xl px-5 pt-20 pb-20 sm:px-8 sm:pt-28 sm:pb-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="border-border bg-card/70 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-(--success) shadow-[0_0_0_3px_color-mix(in_oklch,var(--success)_12%,transparent)]"
            />
            Open-source uptime monitoring
          </div>

          <h1 className="text-foreground mt-7 max-w-4xl text-5xl leading-[0.98] font-semibold tracking-tight text-balance sm:text-7xl">
            Know when your websites and APIs go down.
          </h1>

          <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg">
            Vigil automatically checks your endpoints, tracks uptime, response times, and incidents,
            and notifies you when a monitor goes down or recovers.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Suspense>
              <GetStartedButton />
            </Suspense>

            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={
                <Link
                  href="https://github.com/frshaad/vigil"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <GithubIcon className="size-4" />
              View on GitHub
            </Button>
          </div>

          <div className="text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5 text-sm">
              <IconCheck className="size-4" />
              Free plan
            </div>

            <div className="flex items-center gap-1.5 text-sm">
              <IconCheck className="size-4" />
              HTTP & HTTPS
            </div>

            <div className="flex items-center gap-1.5 text-sm">
              <IconCheck className="size-4" />
              Open source
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-12 -top-12 -z-10 h-full bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_65%)]"
          />

          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
