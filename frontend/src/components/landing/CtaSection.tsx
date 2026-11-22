import React from 'react';
import { Link } from 'react-router-dom';

export default function CtaSection(): React.JSX.Element {
  return (
    <section className="border-t border-wm-border bg-wm-surface py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-wm-text mb-4">
          Ready to eliminate silent downtime?
        </h2>
        <p className="text-base sm:text-lg text-wm-muted max-w-xl mx-auto leading-relaxed mb-8">
          Spin up synthetic monitors in 60 seconds. Connect your WhatsApp bot or Telegram channel and let autonomous agents guard your infrastructure.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="px-7 py-3 rounded-lg bg-wm-accent text-wm-accent-contrast font-bold text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            Start Monitoring Free
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg border border-wm-border bg-wm-surface-2 text-wm-text font-semibold text-sm hover:bg-wm-surface transition-colors"
          >
            Sign In to Console
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-wm-muted">
          <span>✓ No credit card required</span>
          <span>✓ Instant WhatsApp &amp; Telegram hooks</span>
          <span>✓ Agentless setup</span>
        </div>
      </div>
    </section>
  );
}
