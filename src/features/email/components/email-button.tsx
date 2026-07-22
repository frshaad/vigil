import { Button, Section } from 'react-email';

import { styles } from '../styles';

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
}

export function EmailButton({ href, children }: EmailButtonProps) {
  return (
    <Section style={styles.buttonContainer}>
      <Button href={href} style={styles.button}>
        {children}
      </Button>
    </Section>
  );
}
