// WatcherCard — one watcher at a glance: name, URL, status badge, latest latency, uptime.
// Design only: all values arrive as props. No fetching, no navigation logic here.
import StatusBadge from './StatusBadge';
import { formatLatency } from '../../utils/formatLatency';
import type { WatcherStatus } from '../../types';

export interface WatcherCardData {
  name: string;
  url: string;
  status: WatcherStatus;
  latestLatencyMs?: number | null;
  uptimePct?: number | null;
  intervalSeconds?: number;
}

interface WatcherCardProps {
  watcher: WatcherCardData;
  action?: React.ReactNode;
}

export default function WatcherCard({ watcher, action }: WatcherCardProps): React.JSX.Element {
  return (
    <article className="wm-card wm-watcher-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <h3>{watcher.name}</h3>
        <StatusBadge status={watcher.status} />
      </div>
      <span className="wm-watcher-url">{watcher.url}</span>
      <div className="wm-watcher-meta">
        <span>Latency: {formatLatency(watcher.latestLatencyMs)}</span>
        <span>Uptime: {watcher.uptimePct == null ? '—' : `${watcher.uptimePct.toFixed(2)}%`}</span>
        {watcher.intervalSeconds ? <span>Every {watcher.intervalSeconds}s</span> : null}
      </div>
      {action}
    </article>
  );
}
