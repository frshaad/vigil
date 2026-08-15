import type { MonitorMethod } from '@/../prisma/generated/enums';

export const methods: {
  label: string;
  value: MonitorMethod;
  disabled?: boolean;
}[] = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST', disabled: true },
  { label: 'PUT', value: 'PUT', disabled: true },
  { label: 'PATCH', value: 'PATCH', disabled: true },
  { label: 'DELETE', value: 'DELETE', disabled: true },
];
