// StatusBadge — pill showing up / down / degraded, coloured via statusHelpers.
// Design only: pass a status, get the pill. No fetching, no logic.
import { STATUS_COLORS } from '../../utils/statusHelpers';
import type { WatcherStatus } from '../../types';

const LABELS: Record<WatcherStatus, string> = {
  up: 'Up',
  degraded: 'Degraded',
  down: 'Down',
  unknown: 'Unknown',
};

interface StatusBadgeProps {
  status: WatcherStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps): React.JSX.Element {
  const color = STATUS_COLORS[status];
  return (
    <span className="wm-badge" style={{ background: `${color}22`, color }}>
      <span className="wm-dot" style={{ background: color }} />
      {LABELS[status]}
    </span>
  );
}
