import type { Metadata } from 'next';

import { metadataConfig } from './config';

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const resolvedTitle = title ?? metadataConfig.defaultTitle;
  const resolvedDescription = description ?? metadataConfig.defaultDescription;

  return {
    title: resolvedTitle,
    description: resolvedDescription,

    keywords: metadataConfig.keywords,

    authors: [{ name: metadataConfig.creator }],
    creator: metadataConfig.creator,

    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: metadataConfig.appName,
      url: metadataConfig.siteUrl,
    },

    twitter: {
      card: 'summary_large_image',
      creator: metadataConfig.twitterHandle,
      title: resolvedTitle,
      description: resolvedDescription,
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
