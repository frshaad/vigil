import type { NextRequest } from 'next/server';

import { auth } from '@/lib/auth';
import type { AuthenticatedRouteHandler, RouteHandler } from '@/types/route';

import { UnauthorizedError } from './errors';
import { handleError } from './errors/utils';

export function withCurrentUser<C>(handler: AuthenticatedRouteHandler<C>) {
  return async (req: NextRequest, context: C) => {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      throw new UnauthorizedError();
    }

    // oxlint-disable-next-line typescript/return-await
    return handler(req, session.user, context);
  };
}

export function withErrorHandling<C>(handler: RouteHandler<C>): RouteHandler<C> {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      return handleError(error);
    }
  };
}
