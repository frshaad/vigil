'use client';

import { IconWorld } from '@tabler/icons-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type MonitorFaviconProps = {
  url: string;
  size?: 'sm' | 'md';
  className?: string;
};

function getFaviconUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    return new URL('/favicon.ico', parsedUrl.origin).toString();
  } catch {
    return null;
  }
}

export default function MonitorFavicon({ url, size = 'md', className }: MonitorFaviconProps) {
  const faviconUrl = getFaviconUrl(url);
  const [hasError, setHasError] = useState(!faviconUrl);

  const iconClassName = cn(size === 'sm' ? 'size-5' : 'size-6', 'shrink-0', className);

  if (hasError || !faviconUrl) {
    return <IconWorld aria-hidden="true" className={iconClassName} />;
  }

  return (
    // oxlint-disable-next-line next/no-img-element - This image is a external asset
    <img
      src={faviconUrl}
      alt=""
      aria-hidden="true"
      width={size === 'sm' ? 20 : 24}
      height={size === 'sm' ? 20 : 24}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={cn(iconClassName, 'object-contain')}
      onError={() => setHasError(true)}
    />
  );
}
