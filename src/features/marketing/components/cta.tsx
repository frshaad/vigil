import { IconArrowNarrowRight, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';

import { GithubIcon } from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function CallToAction() {
  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div
        aria-hidden="true"
        className="bg-primary/8 dark:bg-primary/14 pointer-events-none absolute inset-x-[10%] top-1/2 h-112 -translate-y-1/2 mask-[radial-gradient(ellipse_at_center,black_0%,transparent_70%)]"
      />

      <div className="border-border/80 bg-card/55 dark:bg-card/25 relative mx-auto max-w-5xl overflow-hidden border">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black,transparent_85%)] bg-size-[36px_36px] opacity-[0.14] dark:opacity-[0.20]"
        />

        <div className="relative px-6 py-16 text-center sm:px-10 sm:py-20">
          <div className="border-primary/20 bg-primary/10 text-primary mx-auto flex size-10 items-center justify-center border">
            <IconSparkles className="size-4" />
          </div>

          <h2 className="text-foreground mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Start monitoring in minutes.
          </h2>

          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-base leading-7 text-pretty sm:text-lg">
            Set up your first monitor, see the result, and know the moment something breaks.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" nativeButton={false} render={<Link href="/dashboard" />}>
              Get Started
              <IconArrowNarrowRight className="size-4" />
            </Button>

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
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
