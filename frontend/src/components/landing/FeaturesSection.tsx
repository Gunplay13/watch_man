import React from 'react';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Synthetic Endpoint Health Checks',
    desc: 'Simulate user traffic and run scheduled HTTP assertions from edge nodes. Detect regressions, latency spikes, and silent 500 errors before users report them.',
    tag: 'Continuous Heartbeat',
  },
  {
    icon: '🛡️',
    title: 'Automated SSL & TLS Guardian',
    desc: 'Never let an expired SSL certificate take your checkout or login offline. Automated certificate chain analysis alerts your team at 30, 14, and 3-day thresholds.',
    tag: 'Cert Expiration Alerts',
  },
  {
    icon: '💬',
    title: 'Instant WhatsApp & Telegram Alerts',
    desc: 'Skip noisy email inboxes. Deliver rich incident notifications with HTTP status codes, latency timings, and curl repro steps straight to your on-call chat groups.',
    tag: 'Chat-First On-Call',
  },
  {
    icon: '🐳',
    title: 'Agentless Container Telemetry',
    desc: 'Monitor Docker container health, unexpected restarts, and memory ceilings without installing bloated agent daemons on your production servers.',
    tag: 'Lightweight & Agentless',
  },
];

export default function FeaturesSection(): React.JSX.Element {
  return (
    <section id="features" className="py-20 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-bold uppercase tracking-wider text-wm-accent mb-2">
          Synthetic Capabilities
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-wm-text mb-4">
          Engineered for zero silent downtime
        </h2>
        <p className="text-base text-wm-muted leading-relaxed">
          Watchman monitors critical APIs, certificates, and infrastructure with precision, keeping developers and AI agents ahead of outages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-wm-border bg-wm-surface p-7 hover:border-wm-accent transition-all duration-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl p-2.5 rounded-lg bg-wm-surface-2 border border-wm-border">
                  {f.icon}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-wm-accent bg-wm-surface-2 px-2.5 py-1 rounded-full border border-wm-border">
                  {f.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-wm-text mb-2">{f.title}</h3>
              <p className="text-sm text-wm-muted leading-relaxed">{f.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-wm-border flex items-center justify-between text-xs text-wm-muted">
              <span>Automated verification</span>
              <span className="text-wm-green font-semibold">Active Monitoring ●</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
