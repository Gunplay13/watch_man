import React, { useState } from 'react';

const PRESETS = [
  { name: 'Payment API', url: 'https://api.gateway.bank/v1/charge', status: 200, latency: 42, sslDays: 78 },
  { name: 'Auth Server', url: 'https://id.company.internal/oauth/token', status: 200, latency: 28, sslDays: 142 },
  { name: 'Gov Portal', url: 'https://eservices.portal.gov.gh/api/health', status: 200, latency: 64, sslDays: 22 },
];

export default function LiveSimulatorSection(): React.JSX.Element {
  const [selected, setSelected] = useState(PRESETS[0]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<typeof PRESETS[0] | null>(PRESETS[0]);

  const runCheck = () => {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      setResult({
        ...selected,
        latency: Math.floor(Math.random() * 30) + 25,
      });
      setRunning(false);
    }, 600);
  };

  return (
    <section id="simulator" className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-wm-border">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs font-bold uppercase tracking-wider text-wm-accent mb-2">
          Interactive Sandbox
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-wm-text mb-4">
          Test a synthetic monitor in real-time
        </h2>
        <p className="text-base text-wm-muted leading-relaxed">
          See how Watchman validates endpoint health, measures latency percentiles, and triggers automated WhatsApp alerts.
        </p>
      </div>

      <div className="max-w-4xl mx-auto rounded-xl border border-wm-border bg-wm-surface p-6 sm:p-8 shadow-sm">
        {/* Preset Selector Bar */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-wm-muted mr-2">Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => { setSelected(p); setResult(p); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                selected.name === p.name
                  ? 'border-wm-accent bg-wm-surface-2 text-wm-accent'
                  : 'border-wm-border bg-wm-surface text-wm-muted hover:text-wm-text'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* URL Input & Run Button */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 flex items-center rounded-lg border border-wm-border bg-wm-surface-2 px-3.5 py-2.5 font-mono text-xs text-wm-text overflow-hidden">
            <span className="text-wm-accent mr-2 font-bold">GET</span>
            <span className="truncate">{selected.url}</span>
          </div>

          <button
            onClick={runCheck}
            disabled={running}
            className="px-6 py-2.5 rounded-lg bg-wm-accent text-wm-accent-contrast font-bold text-xs hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap shadow-sm"
          >
            {running ? 'Running Ping…' : 'Execute Check'}
          </button>
        </div>

        {/* Result Cards Grid */}
        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-wm-surface-2 border border-wm-border">
              <div className="text-[11px] font-bold uppercase tracking-wider text-wm-muted mb-1">HTTP Status</div>
              <div className="text-xl font-extrabold text-wm-green flex items-center gap-1.5">
                <span>{result.status} OK</span>
                <span className="text-xs px-2 py-0.5 rounded bg-wm-surface text-wm-green border border-wm-border">Healthy</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-wm-surface-2 border border-wm-border">
              <div className="text-[11px] font-bold uppercase tracking-wider text-wm-muted mb-1">Synthetic Latency</div>
              <div className="text-xl font-extrabold text-wm-text flex items-center gap-1.5">
                <span>{result.latency} ms</span>
                <span className="text-xs text-wm-muted font-normal">(p95 edge)</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-wm-surface-2 border border-wm-border">
              <div className="text-[11px] font-bold uppercase tracking-wider text-wm-muted mb-1">SSL Certificate</div>
              <div className="text-xl font-extrabold text-wm-accent flex items-center gap-1.5">
                <span>{result.sslDays} days</span>
                <span className="text-xs text-wm-green">Valid</span>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Notification Preview */}
        <div className="rounded-lg border border-wm-border bg-wm-surface-2 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-wm-green text-wm-surface flex items-center justify-center font-bold text-base shadow-sm">
              💬
            </div>
            <div>
              <div className="text-xs font-bold text-wm-text flex items-center gap-2">
                <span>WhatsApp Alert Dispatcher</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-wm-surface text-wm-green border border-wm-border">Connected</span>
              </div>
              <p className="text-xs text-wm-muted mt-0.5">
                Instant incident push configured for on-call engineers via encrypted WhatsApp bot.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-wm-accent font-semibold whitespace-nowrap">
            Latency &lt; 400ms
          </span>
        </div>
      </div>
    </section>
  );
}
