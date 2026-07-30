import { Heading, Text } from 'react-email';

import { EmailButton } from '../components/email-button';
import { EmailLayout } from '../components/email-layout';
import { styles } from '../styles';

interface VerificationEmailProps {
  verificationUrl: string;
}

export default function VerificationEmail({ verificationUrl }: VerificationEmailProps) {
  return (
    <EmailLayout preview="Verify your email address" fallbackUrl={verificationUrl}>
      <Heading style={styles.heading}>Verify your email</Heading>

      <Text style={styles.text}>Thanks for creating your Vigil account.</Text>

      <Text style={styles.text}>Please verify your email address to continue.</Text>

      <EmailButton href={verificationUrl}>Verify Email</EmailButton>

      <Text style={styles.footer}>
        This verification link will expire automatically for security reasons.
      </Text>

      <Text style={styles.footer}>
        If you didn't create this account, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}
