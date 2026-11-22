import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <section className="relative px-6 pt-12 pb-16 max-w-7xl mx-auto w-full">
      {/* Background glow matching Postman screenshot styling */}
      <div
        className="absolute top-1/4 right-8 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ backgroundColor: 'var(--wm-accent)' }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-wm-surface-2 border border-wm-border text-wm-accent mb-5">
            <span className="w-2 h-2 rounded-full bg-wm-green animate-pulse" />
            <span>Synthetic Monitoring for Coding Agents &amp; Developers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-wm-text leading-[1.1] mb-5">
            Watchman Monitors for coding agents and developers
          </h1>

          <p className="text-base sm:text-lg text-wm-muted leading-relaxed mb-7 max-w-xl">
            Watchman is synthetic API &amp; infrastructure monitoring that runs health checks on a schedule, detects hidden latency spikes, tracks SSL expiration, and alerts you the moment an API breaks. Claude Code, Codex, Cursor, and DevOps teams can create monitors, read failed runs, and fix what broke.
          </p>

          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg bg-wm-accent text-wm-accent-contrast font-bold text-sm hover:opacity-90 transition-opacity shadow-sm"
            >
              Get started free
            </Link>
            <a
              href="#simulator"
              className="px-5 py-3 rounded-lg border border-wm-border bg-wm-surface text-wm-text font-semibold text-sm hover:bg-wm-surface-2 transition-colors"
            >
              Live Interactive Demo
            </a>
          </div>

          {/* Install for agents command box */}
          <div className="w-full max-w-lg">
            <div className="text-[11px] font-bold uppercase tracking-wider text-wm-muted mb-2">
              Install for your agents
            </div>

            <div className="flex items-center rounded-lg border border-wm-border bg-wm-surface overflow-hidden shadow-sm">
              <select
                value={pkgManager}
                onChange={(e) => setPkgManager(e.target.value as any)}
                aria-label="Package manager"
                className="bg-wm-surface-2 text-wm-text font-mono text-xs px-3 py-2.5 border-r border-wm-border outline-none cursor-pointer"
              >
                <option value="npm">npm</option>
                <option value="docker">docker</option>
                <option value="curl">curl</option>
                <option value="cli">cli</option>
              </select>

              <code className="flex-1 font-mono text-xs px-3.5 py-2.5 text-wm-text overflow-x-auto whitespace-nowrap">
                {commands[pkgManager]}
              </code>

              <button
                onClick={() => copyCmd(commands[pkgManager])}
                aria-label="Copy install command"
                className="px-3.5 py-2.5 border-l border-wm-border text-xs font-medium text-wm-muted hover:text-wm-accent hover:bg-wm-surface-2 transition-colors flex items-center gap-1.5"
              >
                {copied ? <span className="text-wm-green font-semibold">Copied!</span> : <span>Copy</span>}
              </button>
            </div>

            {/* Agent Support Icons / Tags */}
            <div className="flex items-center gap-3 mt-4 text-xs text-wm-muted flex-wrap">
              <span className="font-semibold px-2 py-0.5 rounded bg-wm-surface-2 border border-wm-border text-wm-text text-[11px]">Claude</span>
              <span className="font-semibold px-2 py-0.5 rounded bg-wm-surface-2 border border-wm-border text-wm-text text-[11px]">Codex</span>
              <span className="font-semibold px-2 py-0.5 rounded bg-wm-surface-2 border border-wm-border text-wm-text text-[11px]">Cursor</span>
              <span className="font-semibold px-2 py-0.5 rounded bg-wm-surface-2 border border-wm-border text-wm-text text-[11px]">Gemini</span>

              <button
                onClick={() => copyCmd('watchman init', true)}
                className="ml-auto font-mono text-[11px] text-wm-muted hover:text-wm-accent flex items-center gap-1 transition-colors"
              >
                <span>GET STARTED WITH <b className="text-wm-text">watchman init</b></span>
                {copiedInit ? <span className="text-wm-green">✓</span> : <span>📋</span>}
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
