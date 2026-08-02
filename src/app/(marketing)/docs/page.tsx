import type { Metadata } from 'next';

import { createMetadata } from '@/lib/metadata/create-metadata';

export const metadata: Metadata = createMetadata({
  title: 'Docs',
  description:
    "Explore Vigil's documentation to learn more about our features and how to use them effectively.",
});

export default function DocsPage() {
  return <h1>This is the docs page.</h1>;
}
