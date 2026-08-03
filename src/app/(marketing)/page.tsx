import type { Metadata } from 'next';

import CallToAction from '@/features/marketing/components/cta';
import Features from '@/features/marketing/components/features';
import Footer from '@/features/marketing/components/footer';
import Header from '@/features/marketing/components/header';
import Hero from '@/features/marketing/components/hero';
import { HowItWorks } from '@/features/marketing/components/how-it-works';
import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  description: 'Landing page for Vigil, a website monitoring service.',
});

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="border-border border-t">
          <Features />
        </div>
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
