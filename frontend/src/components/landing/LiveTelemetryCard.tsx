import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Check, Server, ArrowUpRight } from 'lucide-react';

export default function LiveTelemetryCard(): React.JSX.Element {
  const [latency, setLatency] = useState(38);

  useEffect(() => {
    const id = setInterval(() => {
      setLatency(34 + Math.floor(Math.random() * 10));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const timelineBlocks = [
    'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green',
    'green', 'green', 'green', 'amber', 'green', 'green', 'green', 'green',
    'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green',
    'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green',
  ];

  return (
    <div className="rounded-lg border border-wm-border bg-wm-surface overflow-hidden">
      {/* Visual Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-wm-surface-2 border-b border-wm-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-wm-green" />
          <span className="text-xs font-bold text-wm-text tracking-tight">Active Monitor Node: lagos-edge-01</span>
        </div>
        <span className="font-mono text-[11px] text-wm-green font-semibold">● 99.98% Healthy</span>
      </div>

      <div className="p-5 space-y-4">
        {/* 4 Metric Visual Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-md bg-wm-surface-2 border border-wm-border">
            <div className="flex items-center justify-between text-wm-muted text-[10px] font-semibold uppercase tracking-wider mb-1">
              <span>p95 Latency</span>
              <Activity size={12} className="text-wm-accent" />
            </div>
            <div className="text-xl font-bold text-wm-text flex items-baseline gap-1.5 font-mono">
              <span>{latency}</span>
              <span className="text-xs text-wm-muted font-normal">ms</span>
            </div>
            <div className="w-full bg-wm-border h-1 rounded-sm mt-2 overflow-hidden">
              <div className="bg-wm-accent h-full w-2/5" />
            </div>
          </div>

          <div className="p-3 rounded-md bg-wm-surface-2 border border-wm-border">
            <div className="flex items-center justify-between text-wm-muted text-[10px] font-semibold uppercase tracking-wider mb-1">
              <span>30d Uptime</span>
              <Check size={12} className="text-wm-green" />
            </div>
            <div className="text-xl font-bold text-wm-green font-mono">
              99.98%
            </div>
            <div className="w-full bg-wm-border h-1 rounded-sm mt-2 overflow-hidden">
              <div className="bg-wm-green h-full w-[99.9%]" />
            </div>
          </div>

          <div className="p-3 rounded-md bg-wm-surface-2 border border-wm-border">
            <div className="flex items-center justify-between text-wm-muted text-[10px] font-semibold uppercase tracking-wider mb-1">
              <span>SSL SNI Chain</span>
              <ShieldCheck size={12} className="text-wm-text" />
            </div>
            <div className="text-sm font-bold text-wm-text font-mono">
              74 days left
            </div>
            <div className="text-[10px] text-wm-muted mt-1 truncate">
              Let&apos;s Encrypt • TLS 1.3
            </div>
          </div>

          <div className="p-3 rounded-md bg-wm-surface-2 border border-wm-border">
            <div className="flex items-center justify-between text-wm-muted text-[10px] font-semibold uppercase tracking-wider mb-1">
              <span>Containers</span>
              <Server size={12} className="text-wm-accent" />
            </div>
            <div className="text-sm font-bold text-wm-text font-mono">
              12 / 12 Active
            </div>
            <div className="text-[10px] text-wm-muted mt-1 truncate">
              Docker Engine Socket
            </div>
          </div>
        </div>

        {/* Historical Timeline Strip */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-[11px] text-wm-muted mb-2 font-mono">
            <span>Historical Probe Continuity (Last 24h)</span>
            <span className="text-wm-green">0 Dropped Checks</span>
          </div>
          <div className="grid grid-cols-32 gap-1 h-5">
            {timelineBlocks.map((status, i) => (
              <span
                key={i}
                className={`h-full rounded-sm ${status === 'green' ? 'bg-wm-green' : 'bg-wm-amber'}`}
                title={`Probe ${i + 1}: ${status === 'green' ? '200 OK (38ms)' : 'Latency Spike (142ms)'}`}
              />
            ))}
          </div>
        </div>

        {/* Live Stream Telemetry Ticker */}
        <div className="p-3 rounded-md bg-wm-bg border border-wm-border font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-wm-muted text-[10px]">
            <span>LAST TELEMETRY EVENT</span>
            <span className="text-wm-accent">JUST NOW</span>
          </div>
          <div className="flex items-center justify-between text-wm-text">
            <span className="truncate">GET https://api.bank.gh/v1/checkout</span>
            <span className="text-wm-green font-bold ml-2">200 OK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
