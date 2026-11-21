import React, { useMemo, useState } from 'react';
import { Icon } from '../components/Icon';
import { Sparkline } from '../components/charts';
import { AsyncButton, Confirm, Empty, Modal, Pill, Stat, methodTone, statusTone } from '../components/ui';
import { useApp } from '../state/AppState';
import { Endpoint, Method, simulateCheck, statusText, uid } from '../lib/mock';
import { ago, clock, endpointHealth, hostOf, useNow } from '../lib/utils';

type SortKey = 'name' | 'latency' | 'lastChecked';
const INTERVALS: [number, string][] = [[15, '15s'], [30, '30s'], [60, '1m'], [300, '5m']];
const intervalLabel = (s: number) => INTERVALS.find(([v]) => v === s)?.[1] ?? `${s}s`;

function AddEndpointModal({ onClose }: { onClose: () => void }): React.JSX.Element {
  const { addEndpoint, toast } = useApp();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('https://');
  const [path, setPath] = useState('/health');
  const [method, setMethod] = useState<Method>('GET');
  const [interval, setInterval_] = useState(30);
  const [expected, setExpected] = useState(200);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let parsed: URL;
    try { parsed = new URL(url); } catch { setError('Enter a valid URL, e.g. https://api.example.com'); return; }
    if (!/^https?:$/.test(parsed.protocol)) { setError('Only http(s) URLs can be monitored.'); return; }
    if (!name.trim()) { setError('Give the endpoint a name.'); return; }
    const now = Date.now();
    const base: Endpoint = {
      id: uid('ep'), name: name.trim(), baseUrl: parsed.origin, path: path.startsWith('/') ? path : `/${path}`, method,
      status: expected, statusText: statusText(expected), latency: 0, intervalSec: interval, lastChecked: now, paused: false,
      server: hostOf(parsed.origin), ram: 0, spark: [0, 0, 0, 0, 0, 0], history: [], dns: 0, tls: 0, ttfb: 0,
    };
    addEndpoint(simulateCheck(base));
    toast(`Added “${base.name}” — first check complete`, 'ok');
    onClose();
  };

  return (
    <Modal title="Add Endpoint" onClose={onClose}>
      <form className="wm-form" onSubmit={submit}>
        <label className="wm-field">Name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Payment Gateway API" autoFocus /></label>
        <label className="wm-field">Base URL<input value={url} onChange={(e) => { setUrl(e.target.value); setError(''); }} placeholder="https://api.example.com" /></label>
        <div className="wm-row" style={{ alignItems: 'flex-end' }}>
          <label className="wm-field" style={{ flex: 1 }}>Path<input value={path} onChange={(e) => setPath(e.target.value)} /></label>
          <label className="wm-field">Method
            <select value={method} onChange={(e) => setMethod(e.target.value as Method)}>
              {(['GET', 'POST', 'PUT', 'DELETE', 'HEAD'] as Method[]).map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
        </div>
        <div className="wm-row" style={{ alignItems: 'flex-end' }}>
          <label className="wm-field" style={{ flex: 1 }}>Check interval
            <select value={interval} onChange={(e) => setInterval_(Number(e.target.value))}>
              {INTERVALS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
          <label className="wm-field" style={{ flex: 1 }}>Expected status
            <select value={expected} onChange={(e) => setExpected(Number(e.target.value))}>
              {[200, 201, 204, 301].map((c) => <option key={c} value={c}>{c} {statusText(c)}</option>)}
            </select>
          </label>
        </div>
        {error && <div className="wm-field-error" role="alert">{error}</div>}
        <div className="wm-modal-foot">
          <button type="button" className="wm-btn wm-btn--outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="wm-btn">Add Endpoint</button>
        </div>
      </form>
    </Modal>
  );
}

export default function Endpoints(): React.JSX.Element {
  const { endpoints, runCheck, removeEndpoint, togglePauseEndpoint, toast } = useApp();
  const now = useNow(1000);
  const [q, setQ] = useState('');
  const [statusF, setStatusF] = useState('all');
  const [methodF, setMethodF] = useState('all');
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'name', dir: 1 });
  const [selId, setSelId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<Endpoint | null>(null);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return endpoints
      .filter((e) => (!s || `${e.name} ${e.path} ${e.baseUrl}`.toLowerCase().includes(s))
        && (statusF === 'all' || (statusF === 'healthy' ? e.status < 400 : e.status >= 400))
        && (methodF === 'all' || e.method === methodF))
      .sort((a, b) => {
        const k = sort.key;
        const av = a[k], bv = b[k];
        return (typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number)) * sort.dir;
      });
  }, [endpoints, q, statusF, methodF, sort]);

  const sel = endpoints.find((e) => e.id === selId) ?? null;
  const failing = endpoints.filter((e) => endpointHealth(e) === 'critical' || e.status >= 400).length;
  const avg = endpoints.length ? Math.round(endpoints.reduce((a, e) => a + e.latency, 0) / endpoints.length) : 0;
  const uptime = endpoints.length ? (100 - (failing / endpoints.length) * 0.5).toFixed(2) : '100.00';
  const avgSpark = endpoints[0] ? endpoints[0].spark.map((_, i) => endpoints.reduce((a, e) => a + (e.spark[i] ?? 0), 0) / endpoints.length) : [];

  const th = (key: SortKey, label: string) => (
    <th className="wm-sortable" onClick={() => setSort((s) => ({ key, dir: s.key === key ? (s.dir === 1 ? -1 : 1) : 1 }))} aria-sort={sort.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
      {label}{sort.key === key ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}
    </th>
  );

  return (
    <div className="wm-page">
      <main className="wm-main">
        <h1 className="wm-page-title">Endpoints &amp; APIs</h1>
        <div className="wm-cols-4">
          <Stat label="Total Endpoints" value={endpoints.length} right={<span className="wm-dot" style={{ background: 'var(--wm-green)' }} />} />
          <Stat label="Avg Response Time" value={`${avg}ms`} right={<Sparkline data={avgSpark} color="var(--wm-amber)" />} />
          <Stat label="24h Uptime" value={`${uptime}%`} right={<span className="wm-ok"><Icon name="arrowUp" /></span>} />
          <Stat label="Failing Checks" value={failing} tone={failing ? 'red' : undefined} />
        </div>

        <div className="wm-toolbar">
          <div className="wm-input-icon"><Icon name="search" /><input className="wm-input" placeholder="Search endpoints…" aria-label="Search endpoints" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <select className="wm-select" aria-label="Filter by status" value={statusF} onChange={(e) => setStatusF(e.target.value)}>
            <option value="all">Filter by Status</option><option value="healthy">Healthy</option><option value="failing">Failing</option>
          </select>
          <select className="wm-select" aria-label="Filter by method" value={methodF} onChange={(e) => setMethodF(e.target.value)}>
            <option value="all">Filter by Method</option>{['GET', 'POST', 'PUT', 'DELETE', 'HEAD'].map((m) => <option key={m}>{m}</option>)}
          </select>
          <span className="wm-spacer" />
          <button className="wm-btn" onClick={() => setAdding(true)}><Icon name="plus" />Add Endpoint</button>
        </div>

        <section className="wm-card">
          <div className="wm-card-head"><h2>Endpoints Data Table</h2><span className="wm-note">{rows.length} of {endpoints.length} shown</span></div>
          <div className="wm-table-wrap">
            <table className="wm-table">
              <thead><tr>{th('name', 'Endpoint Name')}<th>Target URL</th><th>Method</th><th>Status</th>{th('latency', 'Latency (ms)')}<th>Check Interval</th>{th('lastChecked', 'Last Checked')}<th aria-label="Actions" /></tr></thead>
              <tbody>
                {rows.map((e) => (
                  <tr key={e.id} className={`wm-clickable${e.id === selId ? ' wm-selected' : ''}`} onClick={() => setSelId(e.id)} style={e.paused ? { opacity: 0.55 } : undefined}>
                    <td>{e.name}{e.paused && <span className="wm-note"> (paused)</span>}</td>
                    <td>{e.path}</td>
                    <td><Pill tone={methodTone(e.method)}>{e.method}</Pill></td>
                    <td><Pill tone={statusTone(e.status)}>{e.status} {e.statusText}</Pill></td>
                    <td><span className="wm-row" style={{ gap: 8, flexWrap: 'nowrap' }}>{e.latency.toLocaleString()}ms <Sparkline data={e.spark} color={e.status >= 400 ? 'var(--wm-red)' : 'var(--wm-green)'} width={56} height={16} /></span></td>
                    <td>{intervalLabel(e.intervalSec)}</td>
                    <td>{ago(e.lastChecked, now)}</td>
                    <td onClick={(ev) => ev.stopPropagation()}>
                      <span className="wm-row" style={{ gap: 2, flexWrap: 'nowrap' }}>
                        <button className="wm-iconbtn" aria-label={`Run check for ${e.name}`} title="Run check now" onClick={async () => { await runCheck(e.id); toast(`Checked ${e.name}`); }}><Icon name="refresh" /></button>
                        <button className="wm-iconbtn" aria-label={`Delete ${e.name}`} title="Delete" onClick={() => setDeleting(e)}><Icon name="trash" /></button>
                      </span>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && <tr className="wm-table-empty"><td colSpan={8}><Empty title="No endpoints match">Try clearing the search or filters, or add a new endpoint.</Empty></td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <aside className="wm-aside">
        <div className="wm-aside-head"><h3>Endpoint Details</h3>{sel && <button className="wm-iconbtn" aria-label="Close details" onClick={() => setSelId(null)}><Icon name="close" /></button>}</div>
        {!sel ? <Empty title="Nothing selected">Click a row to inspect an endpoint.</Empty> : (
          <>
            <div>
              <div className="wm-row" style={{ gap: 8 }}><span className="wm-dot" style={{ background: sel.status >= 400 ? 'var(--wm-red)' : 'var(--wm-green)' }} /><b style={{ fontSize: 17 }}>{sel.name}</b></div>
              <div className="wm-watcher-url">{sel.method} {sel.baseUrl}{sel.path}</div>
              <div style={{ marginTop: 8 }}><Pill tone={sel.status >= 400 ? 'red' : 'green'}>{sel.status >= 400 ? 'Failed' : 'Healthy'}</Pill></div>
            </div>
            <div className="wm-code">
              HTTP/1.1 <span className={sel.status >= 400 ? 'wm-bad' : 'wm-ok'}>{sel.status} {sel.statusText}</span>{'\n'}
              Content-Type: application/json{'\n'}
              Content-Length: {sel.status >= 400 ? 5300 : 412}{'\n'}
              X-Response-Time: {sel.latency}ms{'\n'}
              Server: {sel.server}
            </div>
            <div className="wm-aside-section">
              <b>Latency Breakdown</b>
              {([['DNS', sel.dns, 'wm-bar-teal'], ['TLS', sel.tls, 'wm-bar-green'], ['TTFB', sel.ttfb, sel.ttfb > 500 ? 'wm-bar-red' : 'wm-bar-green']] as const).map(([l, v, cls]) => (
                <div key={l} className="wm-metric-row">
                  <span>{l}:</span>
                  <div className="wm-bar"><i className={cls} style={{ width: `${Math.min(100, (v / Math.max(sel.latency, 1)) * 100)}%` }} /></div>
                  <span>{v.toLocaleString()}ms</span>
                </div>
              ))}
            </div>
            <div className="wm-aside-section">
              <b>Recent Check History</b>
              <div className="wm-timeline-list">
                {sel.history.length === 0 && <span className="wm-note">No checks yet.</span>}
                {sel.history.slice(0, 6).map((h, i) => (
                  <div key={i} className={`wm-timeline-item${h.status >= 400 ? ' wm-fail' : ''}`}>
                    <span className="wm-muted">{clock(h.ts)}</span><span className={h.status >= 400 ? 'wm-bad' : 'wm-ok'}>{h.status} {h.status >= 400 ? 'Failed' : 'OK'}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="wm-aside-foot" style={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <AsyncButton icon="refresh" onRun={async () => { await runCheck(sel.id); toast(`Checked ${sel.name}`, 'ok'); }}>Run check</AsyncButton>
              <button className="wm-btn wm-btn--outline wm-btn--sm" onClick={() => { togglePauseEndpoint(sel.id); toast(sel.paused ? 'Monitoring resumed' : 'Monitoring paused'); }}>
                <Icon name={sel.paused ? 'play' : 'pause'} />{sel.paused ? 'Resume' : 'Pause'}
              </button>
              <button className="wm-btn wm-btn--destructive wm-btn--sm" onClick={() => setDeleting(sel)}><Icon name="trash" />Delete</button>
            </div>
          </>
        )}
      </aside>

      {adding && <AddEndpointModal onClose={() => setAdding(false)} />}
      {deleting && (
        <Confirm
          title="Delete endpoint?"
          message={`“${deleting.name}” will stop being monitored and its check history will be removed.`}
          confirmLabel="Delete"
          onCancel={() => setDeleting(null)}
          onConfirm={() => { removeEndpoint(deleting.id); if (selId === deleting.id) setSelId(null); toast(`Deleted ${deleting.name}`); setDeleting(null); }}
        />
      )}
    </div>
  );
}
