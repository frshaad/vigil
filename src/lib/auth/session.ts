import { headers } from 'next/headers';
import { cache } from 'react';

import { auth } from '@/lib/auth';
import { ForbiddenError, UnauthorizedError } from '@/lib/errors';

export const getSession = cache(
  async () =>
    await auth.api.getSession({
      headers: await headers(),
    })
);

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new UnauthorizedError();
  }
  return session;
}

export async function getCurrentUser() {
  return (await requireAuth()).user;
}

export async function requireOwner(resourceOwnerId: string) {
  const session = await requireAuth();

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
