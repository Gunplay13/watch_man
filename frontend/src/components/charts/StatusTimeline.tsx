// StatusTimeline — strip of historical up/down blocks, one per probe.
// Design only: colours come from `blocks` props via STATUS_COLORS.
import { STATUS_COLORS } from '../../utils/statusHelpers';
import type { WatcherStatus } from '../../types';

const SAMPLE_BLOCKS: WatcherStatus[] = [
  'up', 'up', 'up', 'degraded', 'up', 'up', 'down', 'up', 'up', 'up', 'up', 'unknown',
];

interface StatusTimelineProps {
  blocks?: WatcherStatus[];
}

export default function StatusTimeline({ blocks = SAMPLE_BLOCKS }: StatusTimelineProps): React.JSX.Element {
  return (
    <div className="wm-timeline" aria-label="Status timeline">
      {blocks.map((status, index) => (
        <span
          key={index}
          className="wm-timeline-block"
          style={{ background: STATUS_COLORS[status] }}
          title={status}
        />
      ))}
    </div>
  );
}
