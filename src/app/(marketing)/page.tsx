import type { Metadata } from 'next';

import CallToAction from '@/features/marketing/components/cta';
import Features from '@/features/marketing/components/features';
import Footer from '@/features/marketing/components/footer';
import Header from '@/features/marketing/components/header';
import Hero from '@/features/marketing/components/hero';
import HowItWorks from '@/features/marketing/components/how-it-works';
import Pricing from '@/features/marketing/components/pricing';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  description: 'Landing page for Vigil, a website monitoring service.',
});

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="relative isolate overflow-hidden">
        {/* Ambient page background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {/* Global grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black_0%,black_48%,transparent_94%)] bg-size-[48px_48px] opacity-[0.16] dark:opacity-[0.12]" />

          {/* Hero glow */}
          <div className="bg-primary/10 dark:bg-primary/20 absolute inset-x-0 -top-48 h-160 mask-[radial-gradient(ellipse_at_top,black_0%,transparent_70%)]" />

          {/* Mid-page glow — intentionally overlaps multiple sections */}
          <div className="bg-primary/5 dark:bg-primary/10 absolute inset-x-[-10%] top-120 h-168 mask-[radial-gradient(ellipse_at_center,black_0%,transparent_68%)]" />

          {/* Lower glow */}
          <div className="bg-primary/5 dark:bg-primary/10 absolute inset-x-[-10%] top-368 h-144 mask-[radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10">
          <Hero />
          <Features />
          <HowItWorks />
          <Pricing />
          <CallToAction />
        </div>
      </main>

      <Footer />
    </div>
  );
}
