import React, { useState } from 'react';

type Tab = 'agent' | 'synthetic' | 'ssl' | 'whatsapp';

export default function TerminalMockup(): React.JSX.Element {
  const [tab, setTab] = useState<Tab>('agent');

  return (
    <div className="relative rounded-xl border border-wm-terminal-border bg-wm-terminal-bg shadow-2xl overflow-hidden font-mono text-xs">
      {/* Mac Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-wm-surface-2 border-b border-wm-terminal-border">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-wm-red inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-wm-amber inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-wm-green inline-block" />
        </div>
        <span className="text-[11px] text-wm-muted font-mono tracking-tight">
          Claude Code — ~/checkout-service
        </span>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="flex bg-wm-surface border-b border-wm-terminal-border">
        <button
          onClick={() => setTab('agent')}
          className={`px-3.5 py-2 font-mono text-[11px] border-b-2 transition-colors ${
            tab === 'agent'
              ? 'border-wm-accent text-wm-accent bg-wm-terminal-bg'
              : 'border-transparent text-wm-muted hover:text-wm-text'
          }`}
        >
          Agent Session
        </button>
        <button
          onClick={() => setTab('synthetic')}
          className={`px-3.5 py-2 font-mono text-[11px] border-b-2 transition-colors ${
            tab === 'synthetic'
              ? 'border-wm-accent text-wm-accent bg-wm-terminal-bg'
              : 'border-transparent text-wm-muted hover:text-wm-text'
          }`}
        >
          Synthetic Ping
        </button>
        <button
          onClick={() => setTab('ssl')}
          className={`px-3.5 py-2 font-mono text-[11px] border-b-2 transition-colors ${
            tab === 'ssl'
              ? 'border-wm-accent text-wm-accent bg-wm-terminal-bg'
              : 'border-transparent text-wm-muted hover:text-wm-text'
          }`}
        >
          SSL Guardian
        </button>
        <button
          onClick={() => setTab('whatsapp')}
          className={`px-3.5 py-2 font-mono text-[11px] border-b-2 transition-colors ${
            tab === 'whatsapp'
              ? 'border-wm-accent text-wm-accent bg-wm-terminal-bg'
              : 'border-transparent text-wm-muted hover:text-wm-text'
          }`}
        >
          WhatsApp Hook
        </button>
      </div>

      {/* Terminal Output */}
      <div className="p-4 space-y-2 text-wm-terminal-text min-h-[220px]">
        {tab === 'agent' && (
          <>
            <div className="text-wm-accent font-semibold">
              &gt; watchman monitor https://api.bank.gh/v1/checkout --agent=claude
            </div>
            <div className="text-wm-muted">
              [2026-11-22 02:40:12] Synthesizing continuous heartbeat across 3 regions...
            </div>
            <div className="flex items-center gap-2">
              <span className="text-wm-green">✔</span>
              <span>Lagos Edge Node: <b className="text-wm-green">200 OK</b> (38ms latency)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-wm-green">✔</span>
              <span>Accra Gateway: <b className="text-wm-green">200 OK</b> (44ms latency)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-wm-green">✔</span>
              <span>SSL SNI Certificate: <b className="text-wm-accent">Valid</b> (expires in 74 days)</span>
            </div>
            <div className="p-2 rounded bg-wm-surface-2 border border-wm-border mt-3 text-wm-text">
              <span className="text-wm-accent font-bold">Claude Code:</span> &quot;Synthetic assertions passed. No latency degradation detected.&quot;
            </div>
          </>
        )}

        {tab === 'synthetic' && (
          <>
            <div className="text-wm-accent font-semibold">
              &gt; watchman test --suite api-payment-gateway
            </div>
            <div className="text-wm-muted">Running 4 assertions on target endpoints...</div>
            <div className="flex items-center gap-2">
              <span className="text-wm-green">✔</span>
              <span>POST /v1/auth/token → <b className="text-wm-green">201 Created</b> (42ms)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-wm-green">✔</span>
              <span>GET /v1/wallets/balance → <b className="text-wm-green">200 OK</b> (51ms)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-wm-green">✔</span>
              <span>Payload schema: JSON match 100%</span>
            </div>
            <div className="text-wm-accent mt-2">All monitors healthy. Uptime 99.98% over past 30 days.</div>
          </>
        )}

        {tab === 'ssl' && (
          <>
            <div className="text-wm-accent font-semibold">
              &gt; watchman ssl inspect api.bank.gh
            </div>
            <div className="text-wm-muted">Inspecting TLS Handshake and Certificate Chain...</div>
            <div className="flex items-center gap-2">
              <span className="text-wm-green">●</span>
              <span>Issuer: Let&apos;s Encrypt Authority X3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-wm-green">●</span>
              <span>Protocol: TLS 1.3 / Cipher: AES-256-GCM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-wm-accent">●</span>
              <span>Expires: <b>Feb 04, 2027 (74 days remaining)</b></span>
            </div>
            <div className="text-wm-muted text-[11px] mt-2">
              Automatic alert scheduled for 30d, 14d, and 3d marks via WhatsApp bot.
            </div>
          </>
        )}

        {tab === 'whatsapp' && (
          <>
            <div className="text-wm-accent font-semibold">
              &gt; watchman notify dispatch --channel whatsapp
            </div>
            <div className="text-wm-muted">Testing automated on-call incident dispatch...</div>
            <div className="p-3 rounded-lg bg-wm-surface-2 border border-wm-border text-wm-text space-y-1">
              <div className="text-wm-green font-bold flex items-center gap-1.5">
                <span>[WhatsApp On-Call Alert]</span>
              </div>
              <p className="text-[11px] text-wm-muted">
                🚨 Service: Payment Gateway Webhook<br />
                Status: Recovered (Downtime: 22s)<br />
                Timestamp: 2026-11-22 02:35:10 UTC<br />
                Impact: 0 failed transactions
              </p>
            </div>
            <div className="text-wm-green mt-1">✔ Sent to 4 devops on-call engineers in 380ms</div>
          </>
        )}
      </div>
    </div>
  );
}
