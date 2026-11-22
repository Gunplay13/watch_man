import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Donut, Legend, LineChart, Series } from '../components/charts';
import { Pill, statusTone } from '../components/ui';
import { useApp } from '../state/AppState';
import {
  ago, certFor, certHealth, clock, containerHealth, daysUntil, download, endpointHealth, useLiveSeries, useNow,
} from '../lib/utils';

const RANGES = [60, 30, 15] as const;

export default function Dashboard(): React.JSX.Element {
  const { endpoints, certs, containers, logs, dispatches, clearLogs, clearDispatches, incidents, updateIncident, toast, muted } = useApp();
  const navigate = useNavigate();
  const now = useNow(5000);

  /* ---- pulse chart ---- */
  const cpu = useLiveSeries(1, 60, 35, 18, 0.03, 30);
  const mem = useLiveSeries(2, 60, 72, 10, 0.02, 25);
  const api = useLiveSeries(3, 60, 55, 22, 0.06, 55);
  const resp = useLiveSeries(4, 60, 46, 16, 0.04, 35);
  const [range, setRange] = useState<(typeof RANGES)[number]>(60);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [fill, setFill] = useState(false);

  const all: Series[] = [
    { key: 'cpu', name: 'CPU', color: 'var(--wm-accent)', data: cpu },
    { key: 'mem', name: 'Memory', color: 'var(--wm-amber)', data: mem },
    { key: 'api', name: 'API latency', color: '#60a5fa', data: api },
    { key: 'resp', name: 'Endpoint response times', color: '#9ca3af', data: resp },
  ];
  const visible = all.filter((s) => !hidden.has(s.key)).map((s) => ({ ...s, data: s.data.slice(-range) }));
  const xLabels = [`${range}m`, `${Math.round(range * 0.75)}m`, `${Math.round(range * 0.5)}m`, `${Math.round(range * 0.25)}m`, 'now'];
  const toggle = (k: string) => setHidden((h) => { const n = new Set(h); if (n.has(k)) n.delete(k); else n.add(k); return n; });

  const exportPulse = () => {
    const rows = ['minute,cpu,memory,api_latency,endpoint_response'];
    for (let i = 0; i < range; i++) {
      const j = 60 - range + i;
      rows.push([i, cpu[j], mem[j], api[j], resp[j]].map((v) => (typeof v === 'number' ? v.toFixed(1) : v)).join(','));
    }
    download('watchman-pulse.csv', rows.join('\n'), 'text/csv');
    toast('Exported pulse data', 'ok');
  };

  /* ---- donut ---- */
  const counts = useMemo(() => {
    const c = { healthy: 0, warning: 0, critical: 0 };
    endpoints.forEach((e) => { c[endpointHealth(e)]++; });
    certs.forEach((x) => { c[certHealth(x)]++; });
    containers.forEach((x) => { c[containerHealth(x)]++; });
    return c;
  }, [endpoints, certs, containers]);
  const total = counts.healthy + counts.warning + counts.critical;

  /* ---- incident panel ---- */
  const [incId, setIncId] = useState(incidents[0]?.id);
  const inc = incidents.find((i) => i.id === incId) ?? incidents[0];

  return (
    <div className="wm-page">
      <main className="wm-main">
        <div className="wm-cols-2-1">
          <section className="wm-card">
            <div className="wm-card-head">
              <div><h2>System &amp; Endpoint Pulse</h2><p>Real-time line graph</p></div>
              <div className="wm-row" style={{ gap: 4 }}>
                <select className="wm-select" aria-label="Time range" value={range} onChange={(e) => setRange(Number(e.target.value) as (typeof RANGES)[number])}>
                  {RANGES.map((r) => <option key={r} value={r}>Last {r}m</option>)}
                </select>
                <button className={`wm-iconbtn${fill ? ' wm-active' : ''}`} aria-label="Toggle area fill" title="Toggle area fill" onClick={() => setFill((f) => !f)}><Icon name="target" /></button>
                <button className="wm-iconbtn" aria-label="Export CSV" title="Export CSV" onClick={exportPulse}><Icon name="download" /></button>
              </div>
            </div>
            <LineChart series={visible} xLabels={xLabels} max={120} area={fill} />
            <Legend items={all} hidden={hidden} onToggle={toggle} />
          </section>

          <section className="wm-card">
            <div className="wm-card-head"><div><h2>Watch Status</h2><p>Endpoints, certs &amp; containers</p></div></div>
            <div className="wm-donut-wrap">
              <Donut
                slices={[
                  { label: 'Healthy', value: counts.healthy, color: '#6ee7b7' },
                  { label: 'Warning', value: counts.warning, color: 'var(--wm-amber)' },
                  { label: 'Critical', value: counts.critical, color: 'var(--wm-red)' },
                ]}
                center={<div style={{ textAlign: 'center' }}><div className="wm-donut-center">{total}</div><div className="wm-note">watches</div></div>}
              />
              <div className="wm-row" style={{ justifyContent: 'center', gap: 14 }}>
                <span className="wm-dotlabel"><span className="wm-dot" style={{ background: '#6ee7b7' }} />Healthy {counts.healthy}</span>
                <span className="wm-dotlabel"><span className="wm-dot" style={{ background: 'var(--wm-amber)' }} />Warning {counts.warning}</span>
                <span className="wm-dotlabel"><span className="wm-dot" style={{ background: 'var(--wm-red)' }} />Critical {counts.critical}</span>
              </div>
            </div>
          </section>
        </div>

        <section className="wm-card">
          <div className="wm-card-head">
            <h2>Endpoints &amp; SSL Health</h2>
            <Link className="wm-btn wm-btn--outline wm-btn--sm" to="/endpoints">View all</Link>
          </div>
          <div className="wm-table-wrap">
            <table className="wm-table">
              <thead><tr><th>Target URL</th><th>HTTP Status</th><th>Latency (ms)</th><th>SSL Certificate Expires</th><th>Server</th><th>RAM</th><th>API Endpoint</th></tr></thead>
              <tbody>
                {endpoints.slice(0, 6).map((e) => {
                  const c = certFor(e, certs);
                  const d = c ? daysUntil(c.to, now) : null;
                  return (
                    <tr key={e.id} className="wm-clickable" onClick={() => navigate('/endpoints')}>
                      <td>{e.baseUrl}</td>
                      <td><Pill tone={statusTone(e.status)}>{e.status} {e.status < 400 ? 'OK' : 'Error'}</Pill></td>
                      <td>{e.latency}</td>
                      <td>
                        {c && d !== null ? (
                          d < 0 ? <Pill tone="red">Expired</Pill> : (
                            <span className="wm-row" style={{ gap: 6 }}>
                              <Pill tone="green">Valid ({d}d)</Pill>
                              {d < 30 && <Pill tone="amber">Expiring ({d}d)</Pill>}
                            </span>
                          )
                        ) : <span className="wm-muted">—</span>}
                      </td>
                      <td>{e.server}</td>
                      <td>{e.ram.toFixed(1)}%</td>
                      <td className="wm-muted">{e.baseUrl}{e.path}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="wm-card">
          <div className="wm-card-head"><h2>Live Log &amp; Outbound Alerts</h2><Link className="wm-btn wm-btn--outline wm-btn--sm" to="/logs">Open Log Streamer</Link></div>
          <div className="wm-cols-2-1" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
            <div>
              <div className="wm-spread" style={{ marginBottom: 6 }}>
                <span className="wm-label">Live log</span>
                <button className="wm-iconbtn" aria-label="Clear logs" onClick={clearLogs}><Icon name="trash" /></button>
              </div>
              <div className="wm-code wm-miniscroll" style={{ height: 170 }}>
                {logs.length === 0 && <span className="wm-muted">Log cleared — waiting for new events…</span>}
                {logs.slice(0, 30).map((l) => (
                  <div key={l.id + l.ts} className={`wm-lvl-${l.level}`}>[{l.level}] {l.service}: {l.message}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="wm-spread" style={{ marginBottom: 6 }}>
                <span className="wm-label">Outbound alerts {muted && '(muted)'}</span>
                <button className="wm-iconbtn" aria-label="Clear alerts" onClick={clearDispatches}><Icon name="trash" /></button>
              </div>
              <div className="wm-miniscroll" style={{ height: 170, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {dispatches.length === 0 && <div className="wm-note">No alerts dispatched yet.</div>}
                {dispatches.slice(0, 8).map((d) => (
                  <div key={d.id} className="wm-card" style={{ padding: 10, background: 'var(--wm-surface-2)', fontSize: 13 }}>
                    <div className="wm-spread"><b>{d.channel}</b><span className="wm-note">{ago(d.ts, now)}</span></div>
                    <div className="wm-muted" style={{ wordBreak: 'break-word' }}>{d.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside className="wm-aside">
        <div className="wm-aside-head"><h3>Alert Details: {inc?.title}</h3></div>
        <div className="wm-row" style={{ gap: 6 }}>
          {incidents.map((i) => (
            <button key={i.id} className={`wm-btn wm-btn--sm wm-btn--outline${i.id === inc?.id ? ' wm-active' : ''}`} onClick={() => setIncId(i.id)}>
              {i.acked ? '✓ ' : ''}{i.title.split(' — ')[0].slice(0, 16)}
            </button>
          ))}
        </div>
        {inc && (
          <>
            <LineChart series={[{ key: 'i', name: inc.title, color: '#6ee7b7', data: inc.spark }]} height={110} yTicks={2} area />
            <div className="wm-aside-section">
              <div><span className="wm-muted">Triggered by:</span> <b>{inc.trigger}</b></div>
              <div><span className="wm-muted">Service:</span> {inc.service}</div>
              <div><span className="wm-muted">Severity:</span> <Pill tone={inc.severity === 'Critical' ? 'red' : 'amber'}>{inc.severity}</Pill></div>
              <div className="wm-muted">{inc.detail}</div>
              <div className="wm-row">
                {inc.acked && <Pill tone="green">Acknowledged</Pill>}
                {inc.muted && <Pill tone="grey">Muted</Pill>}
              </div>
            </div>
            <div className="wm-aside-section">
              <span className="wm-label">Actions</span>
              <div className="wm-row">
                <button className="wm-btn wm-btn--outline wm-btn--sm" onClick={() => { updateIncident(inc.id, { acked: !inc.acked }); toast(inc.acked ? 'Acknowledgement removed' : `Acknowledged “${inc.title}”`, 'ok'); }}>
                  <Icon name="check" />{inc.acked ? 'Unacknowledge' : 'Acknowledge'}
                </button>
                <button className="wm-btn wm-btn--outline wm-btn--sm" onClick={() => { updateIncident(inc.id, { muted: !inc.muted }); toast(inc.muted ? 'Alert unmuted' : 'Alert muted for 1 hour'); }}>
                  <Icon name="bellOff" />{inc.muted ? 'Unmute' : 'Mute'}
                </button>
                <Link className="wm-btn wm-btn--outline wm-btn--sm" to={`/logs?source=${inc.service}`}>View logs</Link>
              </div>
            </div>
            <div className="wm-note">Last event {clock(Date.now() - 4 * 60_000)}</div>
          </>
        )}
      </aside>
    </div>
  );
}
