import React from 'react';
import { Activity, ShieldCheck, Check, Globe } from 'lucide-react';

const MONITORS = [
  {
    name: 'Payment Gateway API',
    endpoint: 'https://api.bank.gh/v1/charge',
    region: 'Lagos (LOS-1)',
    latency: '38ms',
    uptime: '100.0%',
    sslDays: '74d',
    blocks: ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  },
  {
    name: 'OAuth Authentication',
    endpoint: 'https://id.company.internal/token',
    region: 'Frankfurt (FRA-1)',
    latency: '26ms',
    uptime: '99.98%',
    sslDays: '142d',
    blocks: ['g','g','g','g','g','g','g','g','g','g','g','a','g','g','g','g','g','g','g','g','g','g','g','g'],
  },
  {
    name: 'Gov Services Gateway',
    endpoint: 'https://portal.gov.gh/api/v2',
    region: 'Accra (ACC-1)',
    latency: '54ms',
    uptime: '99.95%',
    sslDays: '22d',
    blocks: ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  },
  {
    name: 'On-Call Webhook Bus',
    endpoint: 'https://hooks.watchman.dev/push',
    region: 'London (LON-1)',
    latency: '19ms',
    uptime: '100.0%',
    sslDays: '310d',
    blocks: ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  },
];

export default function LiveStatusBoard(): React.JSX.Element {
  return (
    <section className="py-16 px-6 border-b border-wm-border bg-wm-surface-2/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-wm-text mb-2">
              Continuous Multi-Region Observability
            </h2>
            <p className="text-sm text-wm-muted">
              Live synthetic probe execution and response-time continuity across global edge clusters.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-wm-muted">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-wm-green" /> 200 OK</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-wm-amber" /> Latency Degradation</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-wm-red" /> Downtime</span>
          </div>
        </div>

        {/* Dense Telemetry Board */}
        <div className="rounded-lg border border-wm-border bg-wm-surface overflow-hidden divide-y divide-wm-border">
          {MONITORS.map((m) => (
            <div key={m.name} className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-wm-surface-2/50 transition-colors">
              {/* Service Details */}
              <div className="w-full lg:w-72">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm bg-wm-green flex-shrink-0" />
                  <span className="text-sm font-bold text-wm-text tracking-tight">{m.name}</span>
                </div>
                <div className="font-mono text-xs text-wm-muted truncate mt-0.5">{m.endpoint}</div>
                <div className="flex items-center gap-1 text-[11px] text-wm-muted mt-1">
                  <Globe size={11} />
                  <span>{m.region}</span>
                </div>
              </div>

              {/* Historical 24-Block Timeline Bar */}
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-mono text-wm-muted mb-1.5">
                  <span>24h Historical Timeline</span>
                  <span className="text-wm-green font-semibold">{m.uptime} Uptime</span>
                </div>
                <div className="grid grid-cols-24 gap-1 h-4">
                  {m.blocks.map((b, i) => (
                    <span
                      key={i}
                      className={`h-full rounded-sm ${b === 'g' ? 'bg-wm-green' : 'bg-wm-amber'}`}
                      title={`Probe ${i + 1}: ${b === 'g' ? 'Healthy' : 'Degraded'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Metrics Metrics Column */}
              <div className="flex items-center gap-6 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-wm-muted uppercase tracking-wider">Latency</div>
                  <div className="font-bold text-wm-text flex items-center gap-1">
                    <Activity size={12} className="text-wm-accent" />
                    <span>{m.latency}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-wm-muted uppercase tracking-wider">SSL Cert</div>
                  <div className="font-bold text-wm-text flex items-center gap-1">
                    <ShieldCheck size={12} className="text-wm-green" />
                    <span>{m.sslDays}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-wm-muted uppercase tracking-wider">Status</div>
                  <div className="font-bold text-wm-green flex items-center gap-1">
                    <Check size={12} />
                    <span>Active</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
