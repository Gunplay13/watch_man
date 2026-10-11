// formatLatency — 842 -> "842ms", 1234 -> "1.23s", null -> "—"
export function formatLatency(ms) {
  if (ms == null) return '—';
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}
