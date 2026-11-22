import React from 'react';
import { Activity, ShieldCheck, MessageSquare, Server } from 'lucide-react';

const FEATURES = [
  {
    icon: Activity,
    title: 'Synthetic Endpoint Health Checks',
    desc: 'Simulate user traffic and execute scheduled HTTP assertions from edge nodes. Detect regressions, latency spikes, and silent 500 errors before users report them.',
    tag: 'Continuous Heartbeat',
  },
  {
    icon: ShieldCheck,
    title: 'Automated SSL & TLS Guardian',
    desc: 'Never let an expired SSL certificate take your checkout or login offline. Automated certificate chain analysis alerts your team at 30, 14, and 3-day thresholds.',
    tag: 'Cert Expiration Alerts',
  },
  {
    icon: MessageSquare,
    title: 'Instant WhatsApp & Telegram Alerts',
    desc: 'Skip noisy email inboxes. Deliver actionable incident notifications with HTTP status codes, latency timings, and curl repro steps straight to your on-call chat groups.',
    tag: 'Chat-First On-Call',
  },
  {
    icon: Server,
    title: 'Agentless Container Telemetry',
    desc: 'Monitor Docker container health, unexpected restarts, and memory ceilings without installing bloated agent daemons on your production servers.',
    tag: 'Lightweight & Agentless',
  },
];

export default function FeaturesSection(): React.JSX.Element {
  return (
    <section id="features" className="py-16 px-6 border-b border-wm-border">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="text-[11px] font-bold uppercase tracking-wider text-wm-muted mb-2">
            Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-wm-text mb-3">
            Engineered for zero silent downtime
          </h2>
          <p className="text-sm text-wm-muted leading-relaxed">
            Watchman monitors critical APIs, certificates, and infrastructure with precision, keeping developers and AI agents ahead of outages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f) => {
            const IconComponent = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-lg border border-wm-border bg-wm-surface p-6 hover:border-wm-accent/60 transition-colors shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-md bg-wm-surface-2 border border-wm-border flex items-center justify-center text-wm-text">
                      <IconComponent size={16} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-wm-muted bg-wm-surface-2 px-2 py-0.5 rounded-md border border-wm-border">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-wm-text mb-2">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-wm-muted leading-relaxed">{f.desc}</p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-wm-border flex items-center justify-between text-[11px] text-wm-muted">
                  <span>Automated verification</span>
                  <span className="text-wm-green font-medium">Active Monitoring</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
