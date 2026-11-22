import React from 'react';
import { Globe, ShieldCheck, MessageSquare } from 'lucide-react';

const FEATURES = [
  {
    icon: Globe,
    title: 'Global Edge Probes',
    desc: 'Execute automated synthetic HTTP checks across multi-region edge nodes every 30 seconds to catch latency degradation before your users do.',
  },
  {
    icon: ShieldCheck,
    title: 'SSL Certificate Guardian',
    desc: 'Continuous SNI certificate chain inspection. Receive proactive renewal alerts at 30, 14, and 3-day windows before expiration deadlines.',
  },
  {
    icon: MessageSquare,
    title: 'Instant Chat Escalation',
    desc: 'Direct incident traces and status codes delivered straight to on-call WhatsApp and Telegram channels in under 400 milliseconds.',
  },
];

export default function FeaturesSection(): React.JSX.Element {
  return (
    <section id="features" className="w-full border-b border-dashed border-wm-border bg-wm-bg">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border py-24 md:py-32 px-4 md:px-12">
          {/* Calm Section Header */}
          <div className="max-w-xl mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text mb-3">
              Designed for clarity
            </h2>
            <p className="text-sm font-normal text-wm-muted leading-relaxed">
              Everything you need to prevent silent outages, without the operational noise.
            </p>
          </div>

          {/* Minimal 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {FEATURES.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="flex flex-col">
                  <div className="w-9 h-9 rounded-md bg-wm-surface border border-wm-border flex items-center justify-center text-wm-accent mb-4">
                    <IconComp size={18} strokeWidth={2} />
                  </div>
                  <h3 className="text-sm font-semibold text-wm-text mb-2 tracking-tight">
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