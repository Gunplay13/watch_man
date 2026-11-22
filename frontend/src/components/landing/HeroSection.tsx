import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ArrowRight, Terminal } from 'lucide-react';
import LiveTelemetryCard from './LiveTelemetryCard';

export default function HeroSection(): React.JSX.Element {
  const [pkgManager, setPkgManager] = useState<'npm' | 'docker' | 'curl' | 'cli'>('npm');
  const [copied, setCopied] = useState(false);
  const [copiedInit, setCopiedInit] = useState(false);

  const commands: Record<string, string> = {
    npm: 'npm install -g watchman-monitor',
    docker: 'docker run -d --name watchman -p 8080:8080 watchman/agent',
    curl: 'curl -sSL https://get.watchman.dev | sh',
    cli: 'watchman monitor --init',
  };

  const copyCmd = (text: string, isInit = false) => {
    navigator.clipboard.writeText(text);
    if (isInit) {
      setCopiedInit(true);
      setTimeout(() => setCopiedInit(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative px-6 pt-14 pb-16 border-b border-wm-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Direct, Commanding Typography */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black tracking-[-0.03em] text-wm-text leading-[1.08] mb-5">
            Watchman Monitors for coding agents and developers
          </h1>

          <p className="text-sm sm:text-base text-wm-muted leading-relaxed mb-7 max-w-xl font-normal">
            Watchman runs scheduled synthetic endpoint probes, detects micro-latency spikes, verifies TLS/SSL certificate chains, and tracks Docker containers. Autonomous agents like Claude Code, Codex, and Cursor can configure monitors, read failed traces, and remediate broken APIs before users notice.
          </p>

          <div className="flex items-center gap-3.5 mb-9 flex-wrap">
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-md bg-wm-accent text-wm-accent-contrast font-bold text-xs hover:opacity-90 active:translate-y-[1px] transition-all flex items-center gap-2"
            >
              <span>Get started free</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href="#simulator"
              className="px-4 py-2.5 rounded-md border border-wm-border bg-wm-surface text-wm-text font-semibold text-xs hover:bg-wm-surface-2 active:translate-y-[1px] transition-all"
            >
              Interactive Sandbox
            </a>
          </div>

          {/* Precision-Engineered CLI Widget */}
          <div className="w-full max-w-lg">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-wm-muted mb-2">
              <span>Install for your agents</span>
              <span className="font-mono text-[10px] text-wm-muted lowercase">v0.1.0 • darwin/linux</span>
            </div>

            <div className="flex items-center rounded-md border border-wm-border bg-wm-surface overflow-hidden">
              <select
                value={pkgManager}
                onChange={(e) => setPkgManager(e.target.value as any)}
                aria-label="Package manager selector"
                className="bg-wm-surface-2 text-wm-text font-mono text-xs px-3 py-2 border-r border-wm-border outline-none cursor-pointer"
              >
                <option value="npm">npm</option>
                <option value="docker">docker</option>
                <option value="curl">curl</option>
                <option value="cli">cli</option>
              </select>

              <code className="flex-1 font-mono text-xs px-3.5 py-2 text-wm-text overflow-x-auto whitespace-nowrap">
                {commands[pkgManager]}
              </code>

              <button
                onClick={() => copyCmd(commands[pkgManager])}
                aria-label="Copy command"
                className="px-3.5 py-2 border-l border-wm-border text-xs font-semibold text-wm-muted hover:text-wm-text hover:bg-wm-surface-2 active:scale-95 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={13} className="text-wm-green" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Supported Agents Strip */}
            <div className="flex items-center gap-2 mt-3.5 text-xs text-wm-muted flex-wrap">
              <span className="font-semibold text-wm-text">Supported:</span>
              <span className="hover:text-wm-text transition-colors">Claude Code</span>
              <span className="text-wm-border">•</span>
              <span className="hover:text-wm-text transition-colors">Codex</span>
              <span className="text-wm-border">•</span>
              <span className="hover:text-wm-text transition-colors">Cursor</span>
              <span className="text-wm-border">•</span>
              <span className="hover:text-wm-text transition-colors">Gemini</span>

              <button
                onClick={() => copyCmd('watchman init', true)}
                className="ml-auto font-mono text-[11px] text-wm-muted hover:text-wm-text flex items-center gap-1.5 transition-colors"
              >
                <Terminal size={11} className="text-wm-accent" />
                <span>Quickstart: <b className="text-wm-text">watchman init</b></span>
                {copiedInit ? <Check size={11} className="text-wm-green" /> : <Copy size={11} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Telemetry Product Card */}
        <div className="lg:col-span-5 w-full">
          <LiveTelemetryCard />
        </div>
      </div>
    </section>
  );
}
