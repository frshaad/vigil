import type { Route } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import { auth } from '@/lib/auth';
import { ForbiddenError, UnauthorizedError } from '@/lib/errors';

const LOGIN_ROUTE = '/login' satisfies Route;

export const getSession = cache(
  async () =>
    await auth.api.getSession({
      headers: await headers(),
    })
);

export async function requireAuthOrThrow() {
  const session = await getSession();
  if (!session) {
    throw new UnauthorizedError();
  }
  return session;
}

type RequireAuthRedirectOptions = {
  redirectTo?: Route;
  callbackURL?: string;
};

export async function requireAuthOrRedirect(options?: RequireAuthRedirectOptions) {
  const session = await getSession();

  if (session) {
    return session;
  }

  const loginPath = options?.redirectTo ?? LOGIN_ROUTE;

  if (options?.callbackURL !== undefined) {
    redirect(`${loginPath}?redirect=${encodeURIComponent(options.callbackURL)}`);
  }

  redirect(loginPath);
}

export async function getCurrentUserOrThrow() {
  return (await requireAuthOrThrow()).user;
}

export async function getCurrentUserOrRedirect(options?: RequireAuthRedirectOptions) {
  return (await requireAuthOrRedirect(options)).user;
}

export async function requireOwnerOrThrow(resourceOwnerId: string) {
  const session = await requireAuthOrThrow();

  if (session.user.id !== resourceOwnerId) {
    throw new ForbiddenError();
  }

  return session;
}

export function assertOwner(currentUserId: string, ownerId: string) {
  if (currentUserId !== ownerId) {
    throw new ForbiddenError();
  }
}
