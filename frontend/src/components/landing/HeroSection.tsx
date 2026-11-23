import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection(): React.JSX.Element {
  return (
    <section className="w-full border-b border-dashed border-wm-border relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border pt-12 pb-14 md:pt-16 md:pb-16 px-4 md:px-12 flex flex-col items-center text-center">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-wm-text leading-[1.12] max-w-4xl mb-4">
            Catch downtime and performance regressions before your users do
          </h1>

          {/* Clean Subtext */}
          <p className="text-sm sm:text-base text-wm-muted max-w-2xl leading-relaxed mb-6 font-normal">
            Continuously monitor your endpoints for uptime, response latency, and payload validity. Receive instant alerts on Telegram, WhatsApp, Slack, Discord, or Email the moment an outage occurs.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-3.5 mb-10 md:mb-12 flex-wrap">
            <Link
              to="/register"
              style={{ color: '#ffffff' }}
              className="h-11 px-6 rounded-md bg-wm-accent text-wm-primary-foreground text-white font-medium text-sm hover:opacity-90 active:translate-y-[1px] transition-all inline-flex items-center justify-center"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="h-11 px-6 rounded-md border border-wm-border bg-wm-surface text-wm-text font-normal text-sm hover:bg-wm-surface-2 active:translate-y-[1px] transition-all inline-flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>

          {/* Clean Product Preview Visual (Image-First) */}
          <div className="w-full max-w-6xl rounded-lg border border-wm-border bg-wm-surface overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-wm-surface-2 border-b border-wm-border text-xs font-mono text-wm-muted">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-wm-border" />
                <span className="w-2.5 h-2.5 rounded-sm bg-wm-border" />
                <span className="w-2.5 h-2.5 rounded-sm bg-wm-border" />
                <span className="ml-2 text-wm-text font-medium text-[11px]">app.watchman.dev</span>
              </div>
              <span className="text-[11px] text-wm-muted font-normal">Uptime Monitoring</span>
            </div>
            <img
              src="/hero-preview-dark.png?v=2"
              alt="Watchman synthetic endpoint monitoring dashboard - dark mode"
              className="w-full h-auto wm-screenshot-dark"
              loading="eager"
            />
            <img
              src="/hero-preview-light.png?v=2"
              alt="Watchman synthetic endpoint monitoring dashboard - light mode"
              className="w-full h-auto wm-screenshot-light"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}