import React from 'react';
import { Activity, Gauge, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Activity,
    title: 'Dead Endpoint & Outage Detection',
    desc: 'Catch HTTP 4xx/5xx status codes, network timeouts, and connection drops the exact second an endpoint stops responding.',
  },
  {
    icon: Gauge,
    title: 'Slow Response Warnings',
    desc: 'Measure synthetic latency every 30 seconds. Get warned immediately when response times spike before users experience degradation.',
  },
  {
    icon: ShieldCheck,
    title: 'SSL Certificate Guardian',
    desc: 'Deep TLS chain inspection. Receive proactive renewal alerts at 30, 14, and 3-day windows before expiration deadlines.',
  },
];

export default function FeaturesSection(): React.JSX.Element {
  return (
    <section id="features" className="w-full border-b border-dashed border-wm-border bg-wm-bg">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border py-14 md:py-16 px-4 md:px-12">
          {/* Calm Section Header */}
          <div className="max-w-xl mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text mb-2">
              Comprehensive endpoint reliability
            </h2>
            <p className="text-sm font-normal text-wm-muted leading-relaxed">
              Real-time synthetic health checks designed to identify failures and performance degradation immediately.
            </p>
          </div>

          {/* Minimal 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="flex flex-col">
                  <div className="w-9 h-9 rounded-md bg-wm-surface border border-wm-border flex items-center justify-center text-wm-accent mb-3">
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