import type { Metadata } from 'next';

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  return {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),

    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
