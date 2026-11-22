import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ArrowRight, Terminal } from 'lucide-react';

export default function HeroSection(): React.JSX.Element {

  return (
    <section className="w-full border-b border-dashed border-wm-border relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border pt-20 pb-20 md:pt-28 md:pb-24 px-4 md:px-12 flex flex-col items-center text-center">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-wm-text leading-[1.12] max-w-3xl mb-6">
            Synthetic API monitoring built for engineering teams
          </h1>

          {/* Clean Subtext */}
          <p className="text-sm sm:text-base text-wm-muted max-w-xl leading-relaxed mb-8 font-normal">
            Continuous multi-region probes, SSL certificate tracking, and instant incident escalation via WhatsApp and Telegram.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-3.5 mb-10 flex-wrap">
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-md bg-wm-accent text-wm-accent-contrast font-medium text-xs hover:opacity-90 active:translate-y-[1px] transition-all flex items-center gap-2"
            >
              <span>Start Monitoring Free</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-md border border-wm-border bg-wm-surface text-wm-text font-normal text-xs hover:bg-wm-surface-2 active:translate-y-[1px] transition-all"
            >
              Console Login
            </Link>
          </div>

          {/* Clean Product Preview Visual (Image-First) */}
          <div className="w-full max-w-4xl rounded-lg border border-wm-border bg-wm-surface overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-wm-surface-2 border-b border-wm-border text-xs font-mono text-wm-muted">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-wm-border" />
                <span className="w-2.5 h-2.5 rounded-sm bg-wm-border" />
                <span className="w-2.5 h-2.5 rounded-sm bg-wm-border" />
                <span className="ml-2 text-wm-text font-medium text-[11px]">watchman-terminal</span>
              </div>
              <span className="text-[11px] text-wm-muted font-normal">v2.4.0 • production</span>
            </div>
            <img
              src="/hero-preview.png"
              alt="Watchman synthetic monitor preview"
              className="w-full h-auto block"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}