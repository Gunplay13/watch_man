// LatencyChart — line chart of response times for a watcher.
// Design only: pure SVG from `points` props. No fetching, no polling.
// If no points are given, a small sample series is drawn so the
// design can be previewed — replace it with real probe data later.
export interface LatencyPoint {
  label: string;
  ms: number;
}

const SAMPLE_POINTS: LatencyPoint[] = [
  { label: '00:00', ms: 42 }, { label: '04:00', ms: 38 }, { label: '08:00', ms: 45 },
  { label: '12:00', ms: 41 }, { label: '16:00', ms: 39 }, { label: '20:00', ms: 243 },
  { label: 'now', ms: 41 },
];

interface LatencyChartProps {
  points?: LatencyPoint[];
  thresholdMs?: number;
}

export default function LatencyChart({ points = SAMPLE_POINTS, thresholdMs = 100 }: LatencyChartProps): React.JSX.Element {
  const width = 720;
  const height = 220;
  const maxMs = Math.max(thresholdMs * 1.5, ...points.map((p) => p.ms));
  const x = (index: number): number => (points.length === 1 ? width / 2 : (index / (points.length - 1)) * width);
  const y = (ms: number): number => height - (ms / maxMs) * height;
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.ms)}`).join(' ');
  const thresholdY = y(thresholdMs);
  return (
    <div>
      <svg className="wm-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Latency chart">
        <line x1={0} y1={thresholdY} x2={width} y2={thresholdY} stroke="#f59e0b" strokeDasharray="5 5" />
        <text x={width - 130} y={thresholdY - 8} fill="#f59e0b" fontSize="11">
          threshold {thresholdMs}ms
        </text>
        <path d={`${path} L${width},${height} L0,${height} Z`} fill="#2dd4bf" opacity="0.12" />
        <path d={path} fill="none" stroke="#2dd4bf" strokeWidth="2" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--wm-muted)', fontSize: 11 }}>
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}
