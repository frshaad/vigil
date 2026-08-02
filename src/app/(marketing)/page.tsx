import type { Metadata } from 'next';

import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  description: 'Landing page for Vigil, a website monitoring service.',
});

export default function LandingPage() {
  return <h1>Welcome to Vigil! This is the landing page.</h1>;
}
