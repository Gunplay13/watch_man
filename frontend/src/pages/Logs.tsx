import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Legend, StackedBars } from '../components/charts';
import { Empty } from '../components/ui';
import { useApp } from '../state/AppState';
import { Level, LogEntry, SERVICES } from '../lib/mock';
import { clock, download, fullStamp, pad, useNow } from '../lib/utils';

const LEVELS: Level[] = ['INFO', 'WARN', 'ERROR', 'CRITICAL'];
const LEVEL_COLOR: Record<Level, string> = { INFO: 'var(--wm-green)', WARN: 'var(--wm-amber)', ERROR: 'var(--wm-red)', CRITICAL: 'var(--wm-purple)' };
const RANGES: [string, number][] = [['Last 5m', 5], ['Last 15m', 15], ['Last 1h', 60]];

export default function Logs(): React.JSX.Element {
  const { logs, paused, setPaused, clearLogs, toast } = useApp();
  const [params, setParams] = useSearchParams();
  const now = useNow(1000);
  const [q, setQ] = useState('');
  const [levels, setLevels] = useState<Set<Level>>(new Set(LEVELS));
  const [rangeMin, setRangeMin] = useState(15);
  const [selId, setSelId] = useState<string | null>(null);
  const [showStack, setShowStack] = useState(true);
  const source = params.get('source') ?? 'all';

  const setSource = (s: string) => setParams(s === 'all' ? {} : { source: s }, { replace: true });
  const toggleLevel = (l: Level) => setLevels((cur) => {
    const next = new Set(cur);
    if (next.has(l)) next.delete(l); else next.add(l);
    return next;
  });
  const allOn = levels.size === LEVELS.length;

  const cutoff = now - rangeMin * 60_000;
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return logs.filter((l) => l.ts >= cutoff && levels.has(l.level) && (source === 'all' || l.service === source)
      && (!s || `${l.message} ${l.service} ${l.level}`.toLowerCase().includes(s)));
  }, [logs, q, levels, source, cutoff]);

  const buckets = useMemo(() => {
    const n = 30;
    const size = (rangeMin * 60_000) / n;
    const start = now - rangeMin * 60_000;
    const out = Array.from({ length: n }, (_, i) => {
      const t = new Date(start + i * size);
      return { label: i % 10 === 0 ? `${pad(t.getHours())}:${pad(t.getMinutes())}` : '', counts: { INFO: 0, WARN: 0, ERROR: 0, CRITICAL: 0 } as Record<Level, number> };
    });
    filtered.forEach((l) => {
      const i = Math.min(n - 1, Math.max(0, Math.floor((l.ts - start) / size)));
      out[i].counts[l.level]++;
    });
    return out.map((b) => ({ label: b.label, parts: LEVELS.map((lv) => ({ color: LEVEL_COLOR[lv], value: b.counts[lv] })) }));
  }, [filtered, rangeMin, now]);

  const sel: LogEntry | undefined = logs.find((l) => l.id === selId);
  const correlated = sel && (sel.level === 'ERROR' || sel.level === 'CRITICAL')
    ? [{ ch: 'WhatsApp', ts: sel.ts + 1000 }, { ch: 'Telegram', ts: sel.ts + 1500 }]
    : [];

  const exportLogs = () => {
    const rows = ['timestamp,level,service,message', ...filtered.map((l) => [fullStamp(l.ts), l.level, l.service, `"${l.message.replace(/"/g, '""')}"`].join(','))];
    download(`watchman-logs-${Date.now()}.csv`, rows.join('\n'), 'text/csv');
    toast(`Exported ${filtered.length} log lines`, 'ok');
  };

  return (
    <div className="wm-page">
      <main className="wm-main">
        <div className="wm-toolbar">
          <div className="wm-input-icon" style={{ maxWidth: 300 }}><Icon name="search" /><input className="wm-input" placeholder="Search logs (e.g. error, latency)…" aria-label="Search logs" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="wm-row" style={{ gap: 6 }} role="group" aria-label="Log level toggles">
            <span className="wm-note">Log Level:</span>
            <button className="wm-levelbtn" aria-pressed={allOn} onClick={() => setLevels(new Set(allOn ? [] : LEVELS))}>ALL</button>
            {LEVELS.map((l) => (
              <button key={l} className="wm-levelbtn" aria-pressed={levels.has(l)} onClick={() => toggleLevel(l)}>
                <span className="wm-dot" style={{ background: LEVEL_COLOR[l] }} />{l}
              </button>
            ))}
          </div>
          <select className="wm-select" aria-label="Source" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="all">Source: All Services</option>{SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="wm-select" aria-label="Time range" value={rangeMin} onChange={(e) => setRangeMin(Number(e.target.value))}>
            {RANGES.map(([l, v]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <span className="wm-spacer" />
          <button className={`wm-btn wm-btn--outline${paused ? ' wm-active' : ''}`} onClick={() => setPaused(!paused)}><Icon name={paused ? 'play' : 'pause'} />{paused ? 'Resume Stream' : 'Pause Stream'}</button>
          <button className="wm-btn wm-btn--outline" onClick={exportLogs}><Icon name="download" />Export Logs</button>
        </div>

        <section className="wm-card">
          <div className="wm-card-head">
            <h2>Log Volume (Real-time) {!paused && <span className="wm-ok" aria-label="live"><Icon name="pulse" /></span>}</h2>
            <Legend items={LEVELS.map((l) => ({ key: l, name: l.toLowerCase(), color: LEVEL_COLOR[l] }))} />
          </div>
          <StackedBars buckets={buckets} />
        </section>

        <section className="wm-card">
          <div className="wm-card-head">
            <span className="wm-note">{filtered.length.toLocaleString()} lines {paused && '· stream paused'}</span>
            <button className="wm-btn wm-btn--ghost wm-btn--sm" onClick={() => { clearLogs(); setSelId(null); toast('Log buffer cleared'); }}><Icon name="trash" />Clear</button>
          </div>
          <div className="wm-loglist" role="log" aria-live="off">
            {filtered.slice(0, 200).map((l) => (
              <div key={l.id + l.ts} className={`wm-logrow${l.id === selId ? ' wm-selected' : ''}`} onClick={() => setSelId(l.id)} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') setSelId(l.id); }}>
                <time>{clock(l.ts, true)}</time>
                <span className={`wm-levelchip wm-levelchip--${l.level}`}>{l.level}</span>
                <span className="wm-logsvc">[{l.service}]</span>
                <span style={{ wordBreak: 'break-word' }}>{l.message}</span>
              </div>
            ))}
            {filtered.length === 0 && <Empty title="No log lines">Nothing matches the current filters, or the buffer was cleared.</Empty>}
          </div>
        </section>
      </main>

      <aside className="wm-aside">
        <div className="wm-aside-head"><h3>Log Inspector</h3></div>
        {!sel ? <Empty title="Nothing selected">Click a log line to inspect it.</Empty> : (
          <>
            <div className="wm-aside-section">
              <div><span className="wm-muted">Event ID:</span> {sel.id}</div>
              <div><span className="wm-muted">Timestamp:</span> {fullStamp(sel.ts)}</div>
              <div><span className="wm-muted">Service:</span> {sel.service}</div>
              <div><span className="wm-muted">Level:</span> <span className={`wm-lvl-${sel.level}`}>{sel.level}</span></div>
            </div>
            <div className="wm-aside-section">
              <div className="wm-spread"><b>Message</b>
                <button className="wm-iconbtn" aria-label="Copy message" onClick={() => { navigator.clipboard?.writeText(sel.message); toast('Message copied', 'ok'); }}><Icon name="copy" /></button>
              </div>
              <div className="wm-code">{sel.message}</div>
            </div>
            {sel.stack && (
              <div className="wm-aside-section">
                <div className="wm-spread"><b>Stack Trace</b><button className="wm-iconbtn" aria-label={showStack ? 'Hide stack trace' : 'Show stack trace'} onClick={() => setShowStack((s) => !s)}><Icon name={showStack ? 'close' : 'chevronDown'} /></button></div>
                {showStack && <div className="wm-code" style={{ overflowX: 'auto', whiteSpace: 'pre' }}>{sel.stack}</div>}
              </div>
            )}
            <div className="wm-aside-section" style={{ borderTop: '1px solid var(--wm-border)', paddingTop: 14 }}>
              <b>Correlated Alert Triggers</b>
              {correlated.length === 0 && <span className="wm-note">No alerts were triggered by this event.</span>}
              {correlated.map((c) => (
                <div key={c.ch} className="wm-card" style={{ padding: 10, background: 'var(--wm-surface-2)', fontSize: 13 }}>{c.ch} Alert Dispatched ({clock(c.ts)})</div>
              ))}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
