import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ArrowRight, Terminal } from 'lucide-react';

export default function HeroSection(): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const cmd = 'npm install -g watchman-monitor';

  const copy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full border-b border-dashed border-wm-border relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border pt-20 pb-20 md:pt-28 md:pb-24 px-4 md:px-12 flex flex-col items-center text-center">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-wm-text leading-[1.12] max-w-3xl mb-6">
            Know the moment your endpoints are slow or dead
          </h1>

          {/* Clean Subtext */}
          <p className="text-sm sm:text-base text-wm-muted max-w-xl leading-relaxed mb-8 font-normal">
            Continuously monitor your APIs for uptime and response latency. Receive instant alerts on Telegram, Slack, WhatsApp, Email, or Discord when an endpoint fails or degrades.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-3.5 mb-10 flex-wrap">
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-md bg-wm-accent text-wm-accent-contrast font-medium text-xs hover:opacity-90 active:translate-y-[1px] transition-all flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-md border border-wm-border bg-wm-surface text-wm-text font-normal text-xs hover:bg-wm-surface-2 active:translate-y-[1px] transition-all"
            >
              Sign In
            </Link>
          </div>

          {/* Minimal CLI Bar */}
          <div id="install" className="flex items-center rounded-md border border-wm-border bg-wm-surface overflow-hidden max-w-md w-full mb-14 md:mb-16">
            <div className="bg-wm-surface-2 border-r border-wm-border px-3 py-2 text-wm-muted flex items-center gap-1.5 text-xs">
              <Terminal size={13} className="text-wm-accent" />
              <span className="font-mono text-[11px] font-medium">CLI</span>
            </div>
            <code className="flex-1 font-mono text-xs px-3 py-2 text-wm-text text-left truncate font-normal">
              {cmd}
            </code>
            <button
              onClick={copy}
              aria-label="Copy CLI command"
              className="px-3 py-2 border-l border-wm-border text-xs font-normal text-wm-muted hover:text-wm-text hover:bg-wm-surface-2 active:scale-95 transition-all flex items-center gap-1.5"
            >
              {copied ? <Check size={13} className="text-wm-green" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
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