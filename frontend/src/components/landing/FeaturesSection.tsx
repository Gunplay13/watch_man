import React from 'react';
import { Activity, Gauge, CheckSquare, FileText, ShieldCheck, Server } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Activity,
    title: 'Dead Endpoint & Outage Alerts',
    desc: 'Catch HTTP 4xx/5xx errors, network timeouts, and connection drops the exact second an endpoint stops responding, verified across edge nodes.',
  },
  {
    icon: Gauge,
    title: 'Latency Spikes & Slowdown Tracking',
    desc: 'Measure synthetic response times every 30 seconds. Get warned immediately when latency spikes before customers abandon your application.',
  },
  {
    icon: CheckSquare,
    title: 'Payload & Keyword Assertions',
    desc: 'Validate HTTP status codes, specific response headers, and JSON body keys to ensure your endpoints return healthy data, not just 200 OK.',
  },
  {
    icon: FileText,
    title: 'Incident Diagnostics & Traces',
    desc: 'Capture and preserve the exact HTTP status, response headers, and error traces at the moment of failure so you can debug without guessing.',
  },
  {
    icon: ShieldCheck,
    title: 'SSL / TLS Certificate Guardian',
    desc: 'Continuous SNI certificate chain inspection. Receive proactive renewal alerts at 30, 14, and 3-day windows before expiration deadlines.',
  },
  {
    icon: Server,
    title: 'Agentless Container Vitals',
    desc: 'Direct Docker socket telemetry tracks container memory limits, CPU load, and unexpected restart loops without installing heavy host daemons.',
  },
];

export default function FeaturesSection(): React.JSX.Element {
  return (
    <section id="features" className="w-full border-b border-dashed border-wm-border bg-wm-bg">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border py-14 md:py-16 px-4 md:px-12">
          {/* Section Header */}
          <div className="max-w-xl mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text mb-2.5">
              Uptime monitoring with deep performance context
            </h2>
            <p className="text-sm font-normal text-wm-muted leading-relaxed">
              Track availability, catch slow response regressions, and diagnose incidents with full request telemetry.
            </p>
          </div>

          {/* 6-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {CAPABILITIES.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="flex flex-col">
                  <div className="w-9 h-9 rounded-md bg-wm-surface border border-wm-border flex items-center justify-center text-wm-accent mb-3.5">
                    <IconComp size={18} strokeWidth={2} />
                  </div>
                  <h3 className="text-sm font-semibold text-wm-text mb-1.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs font-normal text-wm-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
