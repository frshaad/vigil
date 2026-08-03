import { IconArrowNarrowRight, IconCheck, IconPointFilled } from '@tabler/icons-react';
import Link from 'next/link';

import { GithubIcon } from '@/components/logo';
import { Button } from '@/components/ui/button';

import DashboardPreview from './dashboard-preview';
import GetStartedButton from './get-started-button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Link
            href="/"
            className="border-border bg-card/60 text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-colors"
          >
            <IconPointFilled size={14} className="animate-pulse rounded-full text-(--success)" />
            All systems operational
            <IconArrowNarrowRight className="size-3" />
          </Link>

          <h1 className="text-foreground mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
            Monitor your websites with confidence.
          </h1>

          <p className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed text-pretty sm:text-lg">
            Vigil continuously monitors your websites and APIs, helping you detect downtime before
            your users do.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <GetStartedButton />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="https://github.com/frshaad/vigil" target="_blank" />}
            >
              <GithubIcon className="size-4" />
              View on GitHub
            </Button>
          </div>

          <div className="text-muted-foreground mt-12 flex max-w-xl items-center gap-3 sm:gap-6">
            <p className="text-muted-foreground flex items-center gap-1 text-sm leading-relaxed text-pretty sm:text-base">
              <IconCheck size={20} />
              Free to start
            </p>

            <div className="text-muted-foreground flex items-center gap-1 text-sm leading-relaxed text-pretty sm:text-base">
              <IconCheck />
              <p>No credit card required</p>
            </div>
            <div className="text-muted-foreground flex items-center gap-1 text-sm leading-relaxed text-pretty sm:text-base">
              <IconCheck />
              <p>Open source</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_60%)]"
          />
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
