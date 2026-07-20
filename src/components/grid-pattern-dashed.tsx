'use client';

import { cn } from '@/lib/utils';

import { GridPattern } from './grid-pattern';

export function GridPatternDashed() {
  return (
    <GridPattern
      width={30}
      height={30}
      x={-1}
      y={-1}
      strokeDasharray={'4 2'}
      className={cn('mask-[radial-gradient(500px_circle_at_center,white,transparent)]')}
    />
  );
}
