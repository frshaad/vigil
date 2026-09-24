import { IconArrowNarrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { GithubIcon } from '@/components/logo';
import { Button } from '@/components/ui/button';

import GetStartedButton from './get-started-button';

export default function CTA() {
  return (
    <section id="cta" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="border-border bg-card relative isolate overflow-hidden rounded-3xl border px-6 py-20 text-center sm:px-12 sm:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_65%)]"
          />

          <div className="mx-auto max-w-2xl">
            <p className="text-primary text-sm font-medium">Get started</p>

            <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Start monitoring before the next outage.
            </h2>

            <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty sm:text-lg">
              Create your first monitor in a few seconds and get a clearer picture of what is
              happening with your services.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Suspense>
                <GetStartedButton label="Start monitoring" />
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
                Explore the code
                <IconArrowNarrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
