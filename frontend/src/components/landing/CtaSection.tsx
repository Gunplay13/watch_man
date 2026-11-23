import React from 'react';
import { Link } from 'react-router-dom';

export default function CtaSection(): React.JSX.Element {
  return (
    <section className="w-full border-b border-dashed border-wm-border bg-wm-surface/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border py-14 md:py-16 px-4 md:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text mb-2.5">
            Never miss an endpoint outage or slowdown
          </h2>
          <p className="text-sm font-normal text-wm-muted max-w-xl mx-auto leading-relaxed mb-6">
            Get instant failure alerts, exact HTTP status codes, and latency spikes delivered directly to your team on Telegram, WhatsApp, Slack, Discord, or Email before your users notice.
          </p>

          <div className="flex items-center justify-center">
            <Link
              to="/register"
              style={{ color: '#ffffff' }}
              className="h-11 px-7 rounded-md bg-wm-accent text-wm-primary-foreground text-white font-medium text-sm hover:opacity-90 active:translate-y-[1px] transition-all inline-flex items-center justify-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
