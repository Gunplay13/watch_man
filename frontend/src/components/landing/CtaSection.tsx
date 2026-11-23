import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function CtaSection(): React.JSX.Element {
  return (
    <section className="w-full border-b border-dashed border-wm-border bg-wm-surface/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border py-14 md:py-16 px-4 md:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text mb-2.5">
            Never miss an endpoint outage or slowdown
          </h2>
          <p className="text-sm font-normal text-wm-muted max-w-md mx-auto leading-relaxed mb-6">
            Connect Telegram, Slack, WhatsApp, Email, or Discord in under 60 seconds. Free during developer preview.
          </p>

          <div className="flex items-center justify-center mb-7">
            <Link
              to="/register"
              className="h-11 px-7 rounded-md bg-wm-accent text-wm-accent-contrast font-medium text-sm hover:opacity-90 active:translate-y-[1px] transition-all inline-flex items-center justify-center"
            >
              Get Started
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-wm-muted/80 font-normal flex-wrap">
            <div className="flex items-center gap-1.5">
              <Check size={13} className="text-wm-accent" />
              <span>Dead endpoint detection</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={13} className="text-wm-accent" />
              <span>Slowdown latency warnings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={13} className="text-wm-accent" />
              <span>5 notification channels</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
