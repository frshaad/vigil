'use client';

import { useQueryStates } from 'nuqs';

import { monitorSearchParams } from '../search-params';

export function useMonitorFilters() {
  return useQueryStates(monitorSearchParams);
}
