import React, { useState } from 'react';
import { Play, Check, ShieldCheck, MessageSquare, Activity } from 'lucide-react';

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
        latency: Math.floor(Math.random() * 25) + 26,
      });
      setRunning(false);
    }, 500);
  };

  return (
    <section id="simulator" className="py-16 px-6 border-b border-wm-border">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-wm-text mb-3">
            Test a synthetic monitor in real-time
          </h2>
          <p className="text-sm text-wm-muted leading-relaxed">
            Validate endpoint health, measure synthetic latency percentiles, and simulate an on-call WhatsApp incident alert.
          </p>
        </div>

        <div className="rounded-lg border border-wm-border bg-wm-surface p-6">
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 text-xs">
            <span className="font-semibold text-wm-muted mr-1 uppercase text-[10px] tracking-wider">Presets:</span>
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => { setSelected(p); setResult(p); }}
                className={`px-3 py-1.5 rounded-md font-medium border transition-colors ${
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
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 flex items-center rounded-md border border-wm-border bg-wm-surface-2 px-3 py-2 font-mono text-xs text-wm-text overflow-hidden">
              <span className="text-wm-accent mr-2 font-semibold">GET</span>
              <span className="truncate">{selected.url}</span>
            </div>

            <button
              onClick={runCheck}
              disabled={running}
              className="px-5 py-2 rounded-md bg-wm-accent text-wm-accent-contrast font-semibold text-xs hover:opacity-90 active:translate-y-[1px] transition-all disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <Play size={12} fill="currentColor" />
              <span>{running ? 'Running Ping…' : 'Execute Check'}</span>
            </button>
          </div>

          {/* Result Cards Grid */}
          {result && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-3.5 rounded-md bg-wm-surface-2 border border-wm-border">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-wm-muted mb-1">HTTP Status</div>
                <div className="text-lg font-bold text-wm-green flex items-center gap-1.5">
                  <Check size={16} />
                  <span>{result.status} OK</span>
                </div>
              </div>

              <div className="p-3.5 rounded-md bg-wm-surface-2 border border-wm-border">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-wm-muted mb-1">Synthetic Latency</div>
                <div className="text-lg font-bold text-wm-text flex items-center gap-1.5">
                  <Activity size={16} className="text-wm-accent" />
                  <span>{result.latency} ms</span>
                  <span className="text-xs text-wm-muted font-normal">(p95 edge)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-md bg-wm-surface-2 border border-wm-border">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-wm-muted mb-1">SSL Certificate</div>
                <div className="text-lg font-bold text-wm-text flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-wm-green" />
                  <span>{result.sslDays} days</span>
                  <span className="text-xs text-wm-green font-normal">Valid</span>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Notification Preview */}
          <div className="rounded-md border border-wm-border bg-wm-surface-2 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-wm-surface border border-wm-border text-wm-green flex items-center justify-center">
                <MessageSquare size={16} />
              </div>
              <div>
                <div className="text-xs font-semibold text-wm-text flex items-center gap-2">
                  <span>WhatsApp Alert Hook:</span>
                  <span className="text-wm-green font-medium">Connected</span>
                </div>
                <p className="text-xs text-wm-muted mt-0.5">
                  Instant incident push delivered to on-call engineers via encrypted WhatsApp channel.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-wm-muted font-medium whitespace-nowrap">
              Latency &lt; 400ms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
