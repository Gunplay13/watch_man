// UptimeChart — uptime percentage over time (24h / 7d / 30d).
// Design only: a percentage bar. The number arrives as a prop —
// TODO (Bryan): compute it from CheckResult history when wiring it up.
interface UptimeChartProps {
  uptimePct: number;
  label?: string;
}

export default function UptimeChart({ uptimePct, label = 'Uptime' }: UptimeChartProps): React.JSX.Element {
  const pct = Math.min(100, Math.max(0, uptimePct));
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span className="wm-label">{label}</span>
        <strong>{pct.toFixed(2)}%</strong>
      </div>
      <div className="wm-bar">
        <i style={{ width: `${pct}%`, background: pct >= 99 ? '#22c55e' : pct >= 95 ? '#f59e0b' : '#f43f5e' }} />
      </div>
    </div>
  );
}
