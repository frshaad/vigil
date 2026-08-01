import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { haveIBeenPwned, lastLoginMethod } from 'better-auth/plugins';

import { env } from '@/env';
import { sendEmail } from '@/features/email/send-email';
import ResetPasswordEmail from '@/features/email/templates/reset-password-email';
import VerificationEmail from '@/features/email/templates/verification-email';
import prisma from '@/lib/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    freshAge: 0, // Disable freshness check
  },
  emailAndPassword: {
    enabled: true,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: 60 * 60, // 1 hour
    async sendResetPassword({ user, url }) {
      void sendEmail({
        to: user.email,
        subject: 'Reset your password',
        react: ResetPasswordEmail({ resetUrl: url }),
      });
    },
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
      enabled: process.env.NODE_ENV === 'production',
      customPasswordCompromisedMessage: 'Please choose a more secure password.',
    }),
    nextCookies(),
  ],
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      void sendEmail({
        to: [user.email],
        subject: 'Verify your email address',
        react: VerificationEmail({ verificationUrl: url }),
      });
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type Provider = keyof typeof auth.options.socialProviders;
