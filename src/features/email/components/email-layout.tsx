import { Body, Container, Head, Hr, Html, Link, Preview, Text } from 'react-email';

import { styles } from '../styles';

interface EmailLayoutProps {
  preview: string;
  fallbackUrl?: string;
  children: React.ReactNode;
}

export function EmailLayout({ preview, fallbackUrl, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />

      <Preview>{preview}</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          {children}

          {fallbackUrl !== undefined && (
            <>
              <Hr style={styles.divider} />

              <Text style={styles.small}>
                If the button doesn't work, copy and paste this link into your browser:
              </Text>

              <Link href={fallbackUrl} style={styles.link}>
                {fallbackUrl}
              </Link>
            </>
          )}
        </Container>
      </Body>
    </Html>
  );
}
