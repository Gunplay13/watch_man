import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

export default function CtaSection(): React.JSX.Element {
  return (
    <section className="w-full border-b border-dashed border-wm-border bg-wm-surface/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border py-20 px-4 md:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-wm-text mb-3">
            Ready to eliminate silent downtime?
          </h2>
          <p className="text-sm sm:text-base text-wm-muted max-w-xl mx-auto leading-relaxed mb-8">
            Spin up synthetic monitors in 60 seconds. Connect your WhatsApp bot or Telegram channel and let autonomous agents guard your infrastructure.
          </p>

          <div className="flex items-center justify-center gap-3.5 flex-wrap">
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-md bg-wm-accent text-wm-accent-contrast font-semibold text-xs hover:opacity-90 active:translate-y-[1px] transition-all flex items-center gap-2"
            >
              <span>Start Monitoring Free</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-md border border-wm-border bg-wm-surface-2 text-wm-text font-medium text-xs hover:bg-wm-surface active:translate-y-[1px] transition-all"
            >
              Sign In to Console
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-xs text-wm-muted flex-wrap">
            <div className="flex items-center gap-1.5">
              <Check size={13} className="text-wm-accent" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={13} className="text-wm-accent" />
              <span>WhatsApp &amp; Telegram hooks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={13} className="text-wm-accent" />
              <span>Agentless setup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}