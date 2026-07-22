import type { ReactElement } from 'react';

import { env } from '@/env';

import { resend } from './resend';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  return await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    react,
  });
}
