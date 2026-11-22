import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ArrowRight, Terminal } from 'lucide-react';
import TerminalMockup from './TerminalMockup';

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
    <section className="relative px-6 pt-12 pb-14 border-b border-wm-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-wm-surface border border-wm-border text-wm-muted mb-4">
            <span className="w-1.5 h-1.5 rounded-sm bg-wm-accent" />
            <span className="tracking-wide uppercase text-[11px]">Synthetic API &amp; Infrastructure Monitoring</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-wm-text leading-[1.12] mb-4">
            Watchman Monitors for coding agents and developers
          </h1>

          <p className="text-sm sm:text-base text-wm-muted leading-relaxed mb-6 max-w-xl">
            Watchman runs synthetic endpoint checks on a schedule, detects hidden latency anomalies, monitors SSL certificates, and keeps tabs on your Docker containers. Claude Code, Codex, Cursor, and engineering teams get instant alerts via WhatsApp or Telegram the moment an API breaks.
          </p>

          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-md bg-wm-accent text-wm-accent-contrast font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <span>Get started free</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href="#simulator"
              className="px-4 py-2.5 rounded-md border border-wm-border bg-wm-surface text-wm-text font-medium text-xs hover:bg-wm-surface-2 transition-colors"
            >
              Interactive Sandbox
            </a>
          </div>

          {/* Install for agents command box */}
          <div className="w-full max-w-lg">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-wm-muted mb-2">
              Install for your agents
            </div>

            <div className="flex items-center rounded-md border border-wm-border bg-wm-surface overflow-hidden shadow-sm">
              <select
                value={pkgManager}
                onChange={(e) => setPkgManager(e.target.value as any)}
                aria-label="Package manager"
                className="bg-wm-surface-2 text-wm-text font-mono text-xs px-2.5 py-2 border-r border-wm-border outline-none cursor-pointer"
              >
                <option value="npm">npm</option>
                <option value="docker">docker</option>
                <option value="curl">curl</option>
                <option value="cli">cli</option>
              </select>

              <code className="flex-1 font-mono text-xs px-3 py-2 text-wm-text overflow-x-auto whitespace-nowrap">
                {commands[pkgManager]}
              </code>

              <button
                onClick={() => copyCmd(commands[pkgManager])}
                aria-label="Copy command"
                className="px-3 py-2 border-l border-wm-border text-xs font-medium text-wm-muted hover:text-wm-text hover:bg-wm-surface-2 transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check size={13} className="text-wm-green" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Agent Support Badges */}
            <div className="flex items-center gap-2 mt-3.5 text-xs text-wm-muted flex-wrap">
              <span className="font-medium px-2 py-0.5 rounded-md bg-wm-surface border border-wm-border text-wm-text text-[11px]">Claude Code</span>
              <span className="font-medium px-2 py-0.5 rounded-md bg-wm-surface border border-wm-border text-wm-text text-[11px]">Codex</span>
              <span className="font-medium px-2 py-0.5 rounded-md bg-wm-surface border border-wm-border text-wm-text text-[11px]">Cursor</span>
              <span className="font-medium px-2 py-0.5 rounded-md bg-wm-surface border border-wm-border text-wm-text text-[11px]">Gemini</span>

              <button
                onClick={() => copyCmd('watchman init', true)}
                className="ml-auto font-mono text-[11px] text-wm-muted hover:text-wm-text flex items-center gap-1 transition-colors"
              >
                <span>GET STARTED WITH <b className="text-wm-text">watchman init</b></span>
                {copiedInit ? <Check size={11} className="text-wm-green" /> : <Copy size={11} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal Window */}
        <div className="lg:col-span-5 w-full">
          <TerminalMockup />
        </div>
      </div>
    </section>
  );
}
