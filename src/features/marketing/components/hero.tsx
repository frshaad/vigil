import { IconArrowNarrowRight, IconCheck, IconPointFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { GithubIcon } from '@/components/logo';
import { Button } from '@/components/ui/button';

import DashboardPreview from './dashboard-preview';
import GetStartedButton from './get-started-button';

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-20 sm:px-8 sm:pt-28 sm:pb-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="border-border/80 bg-background/60 text-muted-foreground inline-flex items-center gap-2 border px-3 py-1.5 text-xs shadow-sm backdrop-blur-sm">
            <IconPointFilled
              size={13}
              className="text-(--success) drop-shadow-[0_0_6px_color-mix(in_oklch,var(--success)_55%,transparent)]"
            />
            All systems operational
            <IconArrowNarrowRight className="size-3" />
          </div>

          <h1 className="text-foreground mt-7 text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.25rem]">
            Know when your services go down.
            <span className="text-muted-foreground"> Before your users do.</span>
          </h1>

          <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-7 text-pretty sm:text-lg">
            Vigil continuously checks your websites and APIs, tracks incidents and response times,
            and alerts you when something breaks.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Suspense>
              <GetStartedButton size="lg" />
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

          <div className="text-muted-foreground mt-10 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3 sm:gap-6">
            <p className="flex items-center justify-center gap-1.5">
              <IconCheck className="size-4 text-(--success)" />
              Free to start
            </p>

            <p className="flex items-center justify-center gap-1.5">
              <IconCheck className="size-4 text-(--success)" />
              No credit card
            </p>

            <p className="flex items-center justify-center gap-1.5">
              <IconCheck className="size-4 text-(--success)" />
              Open source
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
          <div
            aria-hidden="true"
            className="bg-primary/0 dark:bg-primary/0 pointer-events-none absolute -inset-x-12 -top-16 -bottom-16 mask-[radial-gradient(ellipse_at_top,black_0%,transparent_68%)]"
          />

          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
