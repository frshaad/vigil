import type { inferParserType } from 'nuqs/server';
import { parseAsString, parseAsStringLiteral } from 'nuqs/server';

export const monitorStatuses = ['all', 'UP', 'DOWN', 'UNKNOWN'] as const;
export const monitorStates = ['all', 'active', 'inactive'] as const;

export const monitorSearchParams = {
  search: parseAsString.withDefault(''),
  status: parseAsStringLiteral(monitorStatuses).withDefault('all'),
  state: parseAsStringLiteral(monitorStates).withDefault('all'),
};

export type MonitorSearchParams = inferParserType<typeof monitorSearchParams>;
