import { IconArrowNarrowRight } from '@tabler/icons-react';
import Link from 'next/link';

import { GithubIcon } from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function CallToAction() {
  return (
    <section id="pricing" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Start monitoring in minutes.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-base leading-relaxed text-pretty sm:text-lg">
            Set up your first monitor for free and know the moment anything breaks. No credit card
            required.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button size="lg" nativeButton={false} render={<Link href="/dashboard" />}>
              Get Started
              <IconArrowNarrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="https://github.com/frshaad/vigil" target="_blank" />}
            >
              <GithubIcon className="size-4" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
