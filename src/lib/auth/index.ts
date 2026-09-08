import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth/minimal';
import { nextCookies } from 'better-auth/next-js';
import { haveIBeenPwned, lastLoginMethod } from 'better-auth/plugins';
import { after } from 'next/server';

import { env } from '@/env';
import { sendEmail } from '@/features/email/send-email';
import ResetPasswordEmail from '@/features/email/templates/reset-password-email';
import VerificationEmail from '@/features/email/templates/verification-email';
import prisma from '@/lib/prisma';

const SESSION = {
  expiresIn: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 1 day
  freshAge: 15 * 60, // 15 minutes
  cookieCacheMaxAge: 5 * 60, // 5 minutes
} as const;

const PASSWORD_RESET = {
  tokenExpiresIn: 60 * 60, // 1 hour
} as const;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  session: {
    expiresIn: SESSION.expiresIn,
    updateAge: SESSION.updateAge,
    freshAge: SESSION.freshAge,

    cookieCache: {
      enabled: true,
      maxAge: SESSION.cookieCacheMaxAge,
    },
  },

  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: PASSWORD_RESET.tokenExpiresIn,

    async sendResetPassword({ user, url }) {
      after(
        sendEmail({
          to: user.email,
          subject: 'Reset your password',
          react: ResetPasswordEmail({ resetUrl: url }),
        }),
      );
    },
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
    },
  },

  advanced: {
    database: {
      joins: true,
    },
  },

  plugins: [
    lastLoginMethod(),

    haveIBeenPwned({
      enabled: process.env.NODE_ENV === 'production',
      customPasswordCompromisedMessage: 'Please choose a more secure password.',
    }),

    nextCookies(),
  ],

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    async sendVerificationEmail({ user, url }) {
      after(
        sendEmail({
          to: user.email,
          subject: 'Verify your email address',
          react: VerificationEmail({ verificationUrl: url }),
        }),
      );
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type Provider = keyof typeof auth.options.socialProviders;
