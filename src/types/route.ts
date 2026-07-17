import type { NextRequest } from 'next/server';

import type { Session } from '@/lib/auth';

export type RouteHandler<C = unknown> = (req: NextRequest, context: C) => Promise<Response>;

export type AuthenticatedRouteHandler<C = unknown> = (
  req: NextRequest,
  user: Session['user'],
  context: C
) => Promise<Response>;
