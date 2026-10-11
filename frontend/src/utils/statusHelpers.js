// statusHelpers — turn probe results into labels/colours for badges & charts.
export function statusFromCode(code) {
  if (code == null) return 'unknown';
  if (code >= 200 && code < 300) return 'up';
  if (code >= 300 && code < 500) return 'degraded';
  return 'down';
}

export const STATUS_COLORS = {
  up: '#16a34a',
  degraded: '#f59e0b',
  down: '#ef4444',
  unknown: '#9ca3af',
};
