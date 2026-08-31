import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'react-email';

import type { NotificationEvent } from '../events';

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(date);
}

interface MonitorNotificationEmailProps {
  event: NotificationEvent;
  monitorName: string;
  monitorUrl: string;
  statusCode: number | null;
  error: string | null;
  startedAt?: Date;
  resolvedAt?: Date | null;
}

export default function MonitorNotificationEmail({
  event,
  monitorName,
  monitorUrl,
  statusCode,
  error,
  startedAt,
  resolvedAt,
}: MonitorNotificationEmailProps) {
  const isDown = event.type === 'MONITOR_DOWN';

  const title = isDown ? `Monitor down: ${monitorName}` : `Monitor recovered: ${monitorName}`;

  return (
    <Html>
      <Head />

      <Preview>{title}</Preview>

      <Body>
        <Container>
          <Heading>{title}</Heading>

          <Text>
            {isDown
              ? 'Vigil detected that this monitor is no longer responding normally.'
              : 'Vigil detected that this monitor has recovered.'}
          </Text>

          <Section>
            <Text>
              <strong>Monitor:</strong> {monitorName}
            </Text>

            <Text>
              <strong>URL:</strong> {monitorUrl}
            </Text>

            {statusCode !== null && (
              <Text>
                <strong>HTTP status:</strong> {statusCode}
              </Text>
            )}

            {error !== null && (
              <Text>
                <strong>Error:</strong> {error}
              </Text>
            )}

            {startedAt && (
              <Text>
                <strong>Started:</strong> {formatDate(startedAt)}
              </Text>
            )}

            {resolvedAt && (
              <Text>
                <strong>Recovered:</strong> {formatDate(resolvedAt)}
              </Text>
            )}
          </Section>

          <Hr />

          <Text>This notification was sent by Vigil.</Text>
        </Container>
      </Body>
    </Html>
  );
}
