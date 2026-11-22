import React from 'react';

export interface Series { key: string; name: string; color: string; data: number[] }

/* Smooth path through points using midpoint quadratic curves. */
function smooth(pts: [number, number][]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q${pts[i][0]},${pts[i][1]} ${mx},${my}`;
  }
  const last = pts[pts.length - 1];
  return `${d} T${last[0]},${last[1]}`;
}

export function LineChart({ series, height = 190, max, xLabels, yTicks = 4, area = false, format = (v: number) => String(Math.round(v)) }: {
  series: Series[]; height?: number; max?: number; xLabels?: string[]; yTicks?: number; area?: boolean; format?: (v: number) => string;
}): React.JSX.Element {
  const W = 640, padL = 40, padR = 8, padT = 8, padB = 22;
  const innerW = W - padL - padR, innerH = height - padT - padB;
  const top = max ?? Math.max(1, ...series.flatMap((s) => s.data)) * 1.1;
  const x = (i: number, n: number) => padL + (n <= 1 ? 0 : (i / (n - 1)) * innerW);
  const y = (v: number) => padT + innerH - (Math.min(v, top) / top) * innerH;
  return (
    <svg className="wm-chart" viewBox={`0 0 ${W} ${height}`} role="img" aria-label="Line chart">
      {Array.from({ length: yTicks + 1 }, (_, i) => {
        const v = (top / yTicks) * i;
        return (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)} stroke="var(--wm-border)" strokeWidth="1" />
            <text x={padL - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill="var(--wm-muted)">{format(v)}</text>
          </g>
        );
      })}
      {xLabels?.map((l, i) => (
        <text key={i} x={padL + (i / Math.max(1, xLabels.length - 1)) * innerW} y={height - 6} fontSize="10" fill="var(--wm-muted)" textAnchor={i === 0 ? 'start' : i === xLabels.length - 1 ? 'end' : 'middle'}>{l}</text>
      ))}
      {series.map((s) => {
        const pts = s.data.map((v, i) => [x(i, s.data.length), y(v)] as [number, number]);
        const d = smooth(pts);
        return (
          <g key={s.key}>
            {area && pts.length > 1 && <path d={`${d} L${pts[pts.length - 1][0]},${padT + innerH} L${pts[0][0]},${padT + innerH} Z`} fill={s.color} opacity="0.12" />}
            <path d={d} fill="none" stroke={s.color} strokeWidth="1.8" strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}

export function Sparkline({ data, color = 'var(--wm-accent)', width = 90, height = 22 }: { data: number[]; color?: string; width?: number; height?: number }): React.JSX.Element {
  const hi = Math.max(1, ...data), lo = Math.min(...data);
  const span = Math.max(1, hi - lo);
  const pts = data.map((v, i) => [(i / Math.max(1, data.length - 1)) * width, height - 2 - ((v - lo) / span) * (height - 4)] as [number, number]);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" style={{ display: 'block' }}>
      <path d={smooth(pts)} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export interface Slice { label: string; value: number; color: string }
export function Donut({ slices, size = 170, center }: { slices: Slice[]; size?: number; center?: React.ReactNode }): React.JSX.Element {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  const r = 40, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Status breakdown">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--wm-border)" strokeWidth="12" />
        {slices.map((s) => {
          const len = (s.value / total) * c;
          const el = (
            <circle key={s.label} cx="50" cy="50" r={r} fill="none" stroke={s.color} strokeWidth="12"
              strokeDasharray={`${Math.max(0, len - (s.value > 0 && slices.filter((x) => x.value > 0).length > 1 ? 1.5 : 0))} ${c}`}
              strokeDashoffset={-offset} transform="rotate(-90 50 50)" />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>{center}</div>
    </div>
  );
}

export interface BarBucket { label: string; parts: { color: string; value: number }[] }
export function StackedBars({ buckets, height = 130 }: { buckets: BarBucket[]; height?: number }): React.JSX.Element {
  const W = 640, padL = 30, padB = 20, padT = 6;
  const innerW = W - padL - 6, innerH = height - padB - padT;
  const top = Math.max(1, ...buckets.map((b) => b.parts.reduce((a, p) => a + p.value, 0)));
  const bw = innerW / Math.max(1, buckets.length);
  return (
    <svg className="wm-chart" viewBox={`0 0 ${W} ${height}`} role="img" aria-label="Log volume">
      {[0, 0.5, 1].map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - 6} y1={padT + innerH - t * innerH} y2={padT + innerH - t * innerH} stroke="var(--wm-border)" />
          <text x={padL - 4} y={padT + innerH - t * innerH + 4} textAnchor="end" fontSize="10" fill="var(--wm-muted)">{Math.round(top * t)}</text>
        </g>
      ))}
      {buckets.map((b, i) => {
        let acc = 0;
        return (
          <g key={i}>
            {b.parts.map((p, j) => {
              const h = (p.value / top) * innerH;
              acc += h;
              return <rect key={j} x={padL + i * bw + 1} y={padT + innerH - acc} width={Math.max(1, bw - 2)} height={h} fill={p.color} rx="1" />;
            })}
            {b.label && <text x={padL + i * bw + bw / 2} y={height - 5} textAnchor="middle" fontSize="10" fill="var(--wm-muted)">{b.label}</text>}
          </g>
        );
      })}
    </svg>
  );
}

export function Legend({ items, onToggle, hidden }: { items: { key: string; name: string; color: string }[]; onToggle?: (key: string) => void; hidden?: Set<string> }): React.JSX.Element {
  return (
    <div className="wm-legend">
      {items.map((i) => (
        <button key={i.key} type="button" aria-pressed={!hidden?.has(i.key)} onClick={() => onToggle?.(i.key)}>
          <span className="wm-dot" style={{ background: i.color }} />{i.name}
        </button>
      ))}
    </div>
  );
}
