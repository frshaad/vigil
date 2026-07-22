import { Heading, Text } from 'react-email';

import { EmailButton } from '../components/email-button';
import { EmailLayout } from '../components/email-layout';
import { styles } from '../styles';

interface ResetPasswordEmailProps {
  resetUrl: string;
}

export default function ResetPasswordEmail({ resetUrl }: ResetPasswordEmailProps) {
  return (
    <EmailLayout preview="Reset your password" fallbackUrl={resetUrl}>
      <Heading style={styles.heading}>Reset your password</Heading>

      <Text style={styles.text}>
        We received a request to reset the password for your
        <strong> Vigil</strong> account.
      </Text>

      <Text style={styles.text}>Click the button below to choose a new password.</Text>

      <EmailButton href={resetUrl}>Reset Password</EmailButton>

      <Text style={styles.footer}>
        This password reset link will expire automatically for security reasons.
      </Text>

      <Text style={styles.footer}>If you didn't request this, ignore this email.</Text>
    </EmailLayout>
  );
}
