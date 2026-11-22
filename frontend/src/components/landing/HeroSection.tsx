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
        <div className="border-x border-dashed border-wm-border pt-16 pb-14 px-4 md:px-12 flex flex-col items-center text-center">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.03em] text-wm-text leading-[1.08] max-w-4xl mb-5">
            Autonomous synthetic monitoring for critical APIs &amp; infrastructure
          </h1>

          {/* Clean Subtext */}
          <p className="text-sm sm:text-base text-wm-muted max-w-2xl leading-relaxed mb-8">
            Deploy continuous edge probes that test your HTTP endpoints, guard SSL certificate chains, and dispatch instant incident telemetry to on-call engineers via WhatsApp and Telegram.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-3.5 mb-10 flex-wrap">
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-md bg-wm-accent text-wm-accent-contrast font-bold text-xs hover:opacity-90 active:translate-y-[1px] transition-all flex items-center gap-2"
            >
              <span>Start Monitoring Free</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href="#canvas"
              className="px-5 py-2.5 rounded-md border border-wm-border bg-wm-surface text-wm-text font-semibold text-xs hover:bg-wm-surface-2 active:translate-y-[1px] transition-all"
            >
              Explore Live Pipeline
            </a>
          </div>

          {/* Precision CLI Installer Widget */}
          <div className="flex items-center rounded-md border border-wm-border bg-wm-surface overflow-hidden max-w-md w-full">
            <div className="bg-wm-surface-2 border-r border-wm-border px-3 py-2 text-wm-muted flex items-center gap-1.5 text-xs">
              <Terminal size={13} className="text-wm-accent" />
              <span className="font-mono text-[11px] font-bold">CLI</span>
            </div>
            <code className="flex-1 font-mono text-xs px-3 py-2 text-wm-text text-left truncate">
              {cmd}
            </code>
            <button
              onClick={copy}
              aria-label="Copy CLI command"
              className="px-3 py-2 border-l border-wm-border text-xs font-semibold text-wm-muted hover:text-wm-text hover:bg-wm-surface-2 active:scale-95 transition-all flex items-center gap-1.5"
            >
              {copied ? <Check size={13} className="text-wm-green" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
