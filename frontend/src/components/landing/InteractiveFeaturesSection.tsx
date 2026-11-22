import React, { useState } from 'react';
import { Activity, ShieldCheck, MessageSquare, Server } from 'lucide-react';

const FEATURES = [
  {
    title: 'Synthetic HTTP Probes',
    desc: 'Simulate user transactions and execute assertion checks every 30 seconds from global edge nodes.',
    tag: 'Continuous Heartbeat',
    icon: Activity,
  },
  {
    title: 'Automated SSL & TLS Guardian',
    desc: 'Deep SNI certificate chain inspection with warnings dispatched at 30, 14, and 3-day renewal thresholds.',
    tag: 'Zero Expired Certs',
    icon: ShieldCheck,
  },
  {
    title: 'Instant WhatsApp & Telegram Alerts',
    desc: 'Actionable push notifications delivered to on-call chat groups with error traces and status codes in under 400ms.',
    tag: 'Chat-First On-Call',
    icon: MessageSquare,
  },
  {
    title: 'Agentless Container Vitals',
    desc: 'Direct Docker socket monitoring tracks memory ceilings, container restart loops, and CPU load without daemons.',
    tag: 'Zero Overhead',
    icon: Server,
  },
];

export default function InteractiveFeaturesSection(): React.JSX.Element {
  const [active, setActive] = useState(0);

  return (
    <section id="features" className="py-20 px-6 border-b border-wm-border">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-wm-text mb-2">
            Engineered for zero silent downtime
          </h2>
          <p className="text-sm text-wm-muted">
            Continuous synthetic validation, TLS protection, and chat-first incident escalation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Tab Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {FEATURES.map((f, i) => {
              const IconComp = f.icon;
              const isSel = active === i;
              return (
                <button
                  key={f.title}
                  onClick={() => setActive(i)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isSel
                      ? 'border-wm-accent bg-wm-surface text-wm-text'
                      : 'border-wm-border bg-wm-surface-2/40 text-wm-muted hover:text-wm-text hover:bg-wm-surface-2'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <IconComp size={16} className={isSel ? 'text-wm-accent' : 'text-wm-muted'} />
                      <span className="text-sm font-bold text-wm-text">{f.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-wm-muted">{f.tag}</span>
                  </div>
                  <p className="text-xs text-wm-muted leading-relaxed">{f.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Visual Display */}
          <div className="lg:col-span-7 rounded-lg border border-wm-border bg-wm-surface p-6 min-h-[340px] flex flex-col justify-between">
            {active === 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-wm-border font-mono text-xs">
                  <span className="font-semibold text-wm-text">Synthetic Response Latency (p95)</span>
                  <span className="text-wm-green font-bold">AVG: 38ms</span>
                </div>
                <div className="h-40 w-full bg-wm-surface-2 rounded-md p-3 flex flex-col justify-between font-mono text-[10px] text-wm-muted">
                  <div className="flex justify-between border-b border-wm-border/50 pb-1">
                    <span>Threshold Limit (200ms)</span>
                    <span className="text-wm-amber">-- warning line --</span>
                  </div>
                  <svg viewBox="0 0 500 70" className="w-full h-16 overflow-visible py-1">
                    <path d="M0 50 Q 50 45, 100 48 T 200 40 T 300 15 T 400 42 T 500 45" fill="none" stroke="var(--wm-accent)" strokeWidth="2" />
                    <circle cx="300" cy="15" r="4" fill="var(--wm-amber)" />
                  </svg>
                  <div className="flex justify-between border-t border-wm-border/50 pt-1">
                    <span>00:00 (Probe #1)</span>
                    <span>12:00 (Probe #720)</span>
                    <span>now (Probe #1,440)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-wm-muted font-mono pt-1">
                  <span>Target: https://api.bank.gh/v1/charge</span>
                  <span className="text-wm-green font-semibold">✔ Assertions Passed (4/4)</span>
                </div>
              </div>
            )}

            {active === 1 && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-wm-border">
                  <span className="font-semibold text-wm-text">TLS Certificate Inspection Chain</span>
                  <span className="text-wm-green font-bold">STATUS: VALID</span>
                </div>
                <div className="p-3 rounded-md bg-wm-surface-2 border border-wm-border flex justify-between">
                  <span className="text-wm-muted">Common Name:</span>
                  <span className="text-wm-text font-bold">api.bank.gh</span>
                </div>
                <div className="p-3 rounded-md bg-wm-surface-2 border border-wm-border flex justify-between">
                  <span className="text-wm-muted">Issuer Authority:</span>
                  <span className="text-wm-text">Let&apos;s Encrypt Authority X3</span>
                </div>
                <div className="p-3 rounded-md bg-wm-surface-2 border border-wm-border flex justify-between">
                  <span className="text-wm-muted">Expiry Runway:</span>
                  <span className="text-wm-accent font-bold">74 days remaining</span>
                </div>
                <div className="w-full bg-wm-border h-2 rounded-sm overflow-hidden mt-3">
                  <div className="bg-wm-accent h-full w-3/4" />
                </div>
              </div>
            )}

            {active === 2 && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-wm-border">
                  <span className="font-semibold text-wm-text">WhatsApp On-Call Hook</span>
                  <span className="text-wm-green font-bold">DELIVERED (340ms)</span>
                </div>
                <div className="p-4 rounded-md bg-wm-surface-2 border border-wm-border space-y-2 text-wm-text">
                  <div className="flex items-center gap-2 text-wm-green font-bold">
                    <MessageSquare size={14} />
                    <span>[Watchman Bot • Alert]</span>
                  </div>
                  <div className="text-[11px] text-wm-muted leading-relaxed">
                    ⚠️ <b>ALERT:</b> High Latency Spike (142ms &gt; 100ms)<br />
                    Endpoint: https://api.bank.gh/v1/charge<br />
                    Region: Lagos Edge Node (LOS-1)<br />
                    Action: On-Call auto-notified via WhatsApp
                  </div>
                  <div className="text-[10px] text-wm-muted text-right">02:40:12 UTC • Encrypted</div>
                </div>
              </div>
            )}

            {active === 3 && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-wm-border">
                  <span className="font-semibold text-wm-text">Docker Socket Telemetry</span>
                  <span className="text-wm-green font-bold">12/12 RUNNING</span>
                </div>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-wm-muted text-[11px] mb-1">
                      <span>API Container Cluster (CPU)</span>
                      <span className="text-wm-text font-bold">42%</span>
                    </div>
                    <div className="w-full bg-wm-border h-2 rounded-sm overflow-hidden">
                      <div className="bg-wm-accent h-full w-[42%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-wm-muted text-[11px] mb-1">
                      <span>Redis Cache Memory</span>
                      <span className="text-wm-text font-bold">68%</span>
                    </div>
                    <div className="w-full bg-wm-border h-2 rounded-sm overflow-hidden">
                      <div className="bg-wm-amber h-full w-[68%]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
