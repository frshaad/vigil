import type { Metadata } from 'next';

import CTA from '@/features/marketing/components/cta';
import Features from '@/features/marketing/components/features';
import Footer from '@/features/marketing/components/footer';
import Header from '@/features/marketing/components/header';
import Hero from '@/features/marketing/components/hero';
import HowItWorks from '@/features/marketing/components/how-it-works';
import Pricing from '@/features/marketing/components/pricing';
import { createMetadata } from '@/lib/metadata/create-metadata';

const title = 'Vigil — Website & API Uptime Monitoring';
const description =
  'Simple uptime monitoring for websites and APIs. Track uptime, response times, incidents, and get notified when something goes down.';

export const metadata: Metadata = {
  ...createMetadata({
    title,
    description,
  }),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: '/',
  },
};

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
