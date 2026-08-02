import type { Metadata } from 'next';

import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Pricing',
  description: "Explore Vigil's pricing plans and choose the one that best fits your needs.",
});

export default function PricingPage() {
  return <h1>This is the pricing page.</h1>;
}
