import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { haveIBeenPwned, lastLoginMethod } from 'better-auth/plugins';

import { env } from '@/env';
import prisma from '@/lib/prisma';

import { hashPassword as hash, verifyPassword as verify } from './argon2';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    password: { hash, verify },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  experimental: { joins: true },
  plugins: [
    lastLoginMethod(),
    haveIBeenPwned({
      enabled: env.NODE_ENV === 'production',
      customPasswordCompromisedMessage: 'Please choose a more secure password.',
    }),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
