import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Legend, LineChart, Series } from '../components/charts';
import { Confirm, Pill, Stat, Tone } from '../components/ui';
import { useApp } from '../state/AppState';
import { Container, ramLabel } from '../lib/mock';
import { containerHealth, useLiveSeries } from '../lib/utils';

const RANGES = [60, 30, 15] as const;
const statusTone = (c: Container): Tone => (c.status === 'Restarting' ? 'blue' : containerHealth(c) === 'healthy' ? 'green' : containerHealth(c) === 'warning' ? 'amber' : 'red');

export default function Infrastructure(): React.JSX.Element {
  const { containers, restartContainer } = useApp();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState<string | null>(null);
  const [range, setRange] = useState<(typeof RANGES)[number]>(60);
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const cpu = useLiveSeries(11, 60, 55, 30, 0.05, 35);
  const mem = useLiveSeries(12, 60, 70, 18, 0.03, 25);
  const net = useLiveSeries(13, 60, 50, 35, 0.08, 45);
  const disk = useLiveSeries(14, 60, 32, 14, 0.04, 40);
  const all: Series[] = [
    { key: 'cpu', name: 'CPU', color: '#6ee7b7', data: cpu },
    { key: 'mem', name: 'Memory', color: 'var(--wm-amber)', data: mem },
    { key: 'net', name: 'Network I/O', color: '#60a5fa', data: net },
    { key: 'disk', name: 'Disk I/O', color: '#fb7185', data: disk },
  ];
  const visible = all.filter((s) => !hidden.has(s.key)).map((s) => ({ ...s, data: s.data.slice(-range) }));
  const toggle = (k: string) => setHidden((h) => { const n = new Set(h); if (n.has(k)) n.delete(k); else n.add(k); return n; });

  const running = containers.filter((c) => c.status === 'Running').length;
  const avgCpu = containers.length ? Math.round(containers.reduce((a, c) => a + c.cpu, 0) / containers.length) : 0;
  const diskWarn = containers.filter((c) => c.disk >= 70).length;
  const rows: { label: string; cell: (c: Container) => React.ReactNode }[] = [
    { label: 'Status', cell: (c) => <Pill tone={statusTone(c)}>{c.status === 'Running' && containerHealth(c) !== 'healthy' ? 'Warning' : c.status}</Pill> },
    { label: 'CPU %', cell: (c) => `${String(c.cpu).padStart(2, '0')}%` },
    { label: 'RAM Usage', cell: (c) => ramLabel(c.ramGb) },
    { label: 'Disk Usage', cell: (c) => <span className={c.disk >= 70 ? 'wm-warn' : undefined}>{String(c.disk).padStart(2, '0')}%</span> },
    { label: 'Network Rx/Tx', cell: (c) => <>{c.rx} <span className="wm-muted">/ {c.tx}</span></> },
    { label: 'Uptime', cell: (c) => c.uptime },
    { label: 'Actions', cell: (c) => (
      <span className="wm-row" style={{ gap: 6, flexWrap: 'nowrap' }}>
        <button className="wm-btn wm-btn--outline wm-btn--sm" disabled={c.status === 'Restarting'} onClick={() => setConfirm(c.name)}>Restart</button>
        <button className="wm-btn wm-btn--outline wm-btn--sm" onClick={() => navigate(`/logs?source=${c.name}`)}>Logs</button>
      </span>
    ) },
  ];

  return (
    <div className="wm-page">
      <main className="wm-main">
        <div className="wm-cols-4">
          <Stat label="Active Nodes" value={12} />
          <Stat label="Running Containers" value={`${running}/${containers.length}`} />
          <Stat label="Avg CPU Load" value={`${avgCpu}%`} />
          <Stat label="Disk I/O Warning" value={diskWarn} warn={diskWarn > 0} />
        </div>

        <section className="wm-card">
          <div className="wm-card-head">
            <div><h2>Infrastructure Resource Usage</h2><p>Real-time line graph</p></div>
            <select className="wm-select" aria-label="Time range" value={range} onChange={(e) => setRange(Number(e.target.value) as (typeof RANGES)[number])}>
              {RANGES.map((r) => <option key={r} value={r}>Last {r}m</option>)}
            </select>
          </div>
          <LineChart series={visible} area max={120} xLabels={[`${range}m`, `${Math.round(range * 0.66)}m`, `${Math.round(range * 0.33)}m`, 'now']} />
          <Legend items={all} hidden={hidden} onToggle={toggle} />
        </section>

        <section className="wm-card">
          <div className="wm-card-head"><h2>Infrastructure &amp; Containers Grid</h2></div>
          <div className="wm-table-wrap">
            <table className="wm-table">
              <thead><tr><th>Host / Container Name</th>{containers.map((c) => <th key={c.name}>{c.name}</th>)}</tr></thead>
              <tbody>{rows.map((r) => <tr key={r.label}><td>{r.label}</td>{containers.map((c) => <td key={c.name}>{r.cell(c)}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>
      </main>

      <aside className="wm-aside">
        <div className="wm-aside-head"><h3>Node Telemetry</h3></div>
        <div className="wm-aside-section">
          <b>Host Specs:</b>
          <div><span className="wm-muted">OS:</span> Linux Mint</div>
          <div><span className="wm-muted">CPU:</span> 8-Core</div>
          <div><span className="wm-muted">Memory:</span> 16GB</div>
          <div><span className="wm-muted">Disk:</span> SSD 512GB</div>
        </div>
        <div className="wm-aside-section" style={{ borderTop: '1px solid var(--wm-border)', paddingTop: 14 }}>
          <b>Quick container action:</b>
          {containers.map((c) => (
            <div key={c.name} className="wm-spread">
              <span>{c.name}</span>
              <span className="wm-row" style={{ gap: 6 }}>
                <button className="wm-btn wm-btn--outline wm-btn--sm" disabled={c.status === 'Restarting'} onClick={() => setConfirm(c.name)}>{c.status === 'Restarting' ? <span className="wm-spinner" /> : null}Restart</button>
                <button className="wm-btn wm-btn--outline wm-btn--sm" onClick={() => navigate(`/logs?source=${c.name}`)}>Logs</button>
              </span>
            </div>
          ))}
        </div>
        <div className="wm-aside-section"><b>Disk</b><LineChart series={[{ key: 'd', name: 'Disk', color: '#6ee7b7', data: disk.slice(-30) }]} height={90} yTicks={2} area format={(v) => `${Math.round(v)}k`} /></div>
        <div className="wm-aside-section"><b>Network I/O</b><LineChart series={[{ key: 'n', name: 'Network', color: '#60a5fa', data: net.slice(-30) }]} height={90} yTicks={2} area format={(v) => `${(v / 50).toFixed(1)}M`} /></div>
      </aside>

      {confirm && (
        <Confirm title={`Restart ${confirm}?`} message="The container will be stopped and started again. In-flight requests may fail while it restarts." confirmLabel="Restart"
          onCancel={() => setConfirm(null)} onConfirm={() => { restartContainer(confirm); setConfirm(null); }} />
      )}
    </div>
  );
}
