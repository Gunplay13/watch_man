import React from 'react';

const STEPS = [
  {
    step: '01',
    title: 'Add target endpoints',
    desc: 'Enter your API or website URLs, choose check frequencies down to 30 seconds, and define expected HTTP status codes and payload assertions.',
  },
  {
    step: '02',
    title: 'Select alert channels',
    desc: 'Pick how your team receives alerts: Telegram bots, Slack webhooks, WhatsApp direct chat, Discord channels, or email post-mortems.',
  },
  {
    step: '03',
    title: 'Automated continuous protection',
    desc: 'Edge probes continuously test your endpoints 24/7. When an outage or latency spike occurs, alerts fire with preserved diagnostic traces.',
  },
];

export default function HowItWorksSection(): React.JSX.Element {
  return (
    <section id="how-it-works" className="w-full border-b border-dashed border-wm-border bg-wm-surface/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border py-14 md:py-16 px-4 md:px-12">
          {/* Header */}
          <div className="max-w-xl mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text mb-2.5">
              How Watchman works
            </h2>
            <p className="text-sm font-normal text-wm-muted leading-relaxed">
              Start monitoring in under 60 seconds with zero agents to install.
            </p>
          </div>

          {/* 3-Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="p-5 rounded-lg border border-wm-border bg-wm-surface flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-wm-accent">
                      STEP {s.step}
                    </span>
                    <span className="w-2 h-2 rounded-sm bg-wm-green" />
                  </div>
                  <h3 className="text-sm font-semibold text-wm-text mb-2 tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-xs font-normal text-wm-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
