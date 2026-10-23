// logs — probe results, live status, and history for charts.
import client from './client';
import type { CheckResult, WatcherStatus } from '../types';

export type LogParams = Record<string, string | number | boolean | undefined>;

export const getWatcherStatus = (id: number) =>
  client.get<{ status: WatcherStatus; latest: CheckResult | null }>(`/watchers/${id}/status/`);
export const getWatcherLogs = (id: number, params?: LogParams) =>
  client.get<CheckResult[]>(`/watchers/${id}/logs/`, { params });
export const getAllLogs = (params?: LogParams) => client.get<CheckResult[]>('/logs/', { params });
