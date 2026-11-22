import React, { useState } from 'react';
import { Check, ShieldCheck, Play } from 'lucide-react';

export default function HeroCanvas(): React.JSX.Element {
  const [running, setRunning] = useState(false);
  const [latency, setLatency] = useState(38);

  const runPipeline = () => {
    setRunning(true);
    setTimeout(() => {
      setLatency(32 + Math.floor(Math.random() * 12));
      setRunning(false);
    }, 600);
  };

  return (
    <section id="canvas" className="w-full border-b border-dashed border-wm-border relative bg-wm-bg">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border p-5 md:p-8">
          {/* Canvas Window Header */}
          <div className="rounded-lg border border-wm-border bg-wm-surface overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-wm-surface-2 border-b border-wm-border">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-sm bg-wm-green" />
                <span className="font-bold text-wm-text">Synthetic Pipeline Canvas</span>
                <span className="text-wm-muted">• Cluster: watchman-global-edge</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-wm-green font-semibold flex items-center">
                  <span className="w-1.5 h-1.5 rounded-sm bg-wm-green mr-1.5 inline-block" />
                  {latency}ms Average Latency
                </span>
                <button
                  onClick={runPipeline}
                  disabled={running}
                  className="px-3 py-1.5 rounded-md bg-wm-accent text-wm-accent-contrast font-bold text-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Play size={11} fill="currentColor" />
                  <span>{running ? 'Probing Nodes…' : 'Execute Probe'}</span>
                </button>
              </div>
            </div>

            {/* Visual 3-Node Architecture Pipeline */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Node 1: Target Endpoint */}
              <div className="p-4 rounded-md bg-wm-surface-2 border border-wm-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-wm-muted mb-2">
                    <span>STEP 01</span>
                    <span className="text-wm-accent font-semibold">Target API</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-wm-text truncate mb-1">
                    https://api.bank.gh/v1/checkout
                  </div>
                  <div className="font-mono text-[11px] text-wm-muted">
                    Method: POST • JSON Schema
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-wm-border flex items-center justify-between text-xs font-mono">
                  <span className="text-wm-muted">Status Code</span>
                  <span className="text-wm-green font-bold flex items-center gap-1">
                    <Check size={12} /> 200 OK
                  </span>
                </div>
              </div>

              {/* Node 2: Multi-Region Edge Mesh */}
              <div className="p-4 rounded-md bg-wm-surface-2 border border-wm-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-wm-muted mb-2">
                    <span>STEP 02</span>
                    <span className="text-wm-accent font-semibold">Edge Synthetic Mesh</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-wm-text">
                      <span>Lagos (LOS-1)</span>
                      <span className="text-wm-green font-bold">{latency}ms</span>
                    </div>
                    <div className="flex justify-between text-wm-text">
                      <span>Frankfurt (FRA-1)</span>
                      <span className="text-wm-green font-bold">28ms</span>
                    </div>
                    <div className="flex justify-between text-wm-text">
                      <span>London (LON-1)</span>
                      <span className="text-wm-green font-bold">19ms</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-wm-border flex items-center justify-between text-xs font-mono">
                  <span className="text-wm-muted">TLS 1.3 Chain</span>
                  <span className="text-wm-accent font-bold flex items-center gap-1">
                    <ShieldCheck size={12} /> 74d Valid
                  </span>
                </div>
              </div>

              {/* Node 3: On-Call Incident Dispatch */}
              <div className="p-4 rounded-md bg-wm-surface-2 border border-wm-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-wm-muted mb-2">
                    <span>STEP 03</span>
                    <span className="text-wm-accent font-semibold">On-Call Escalation</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-wm-text">
                      <span>WhatsApp On-Call Bot</span>
                      <span className="text-wm-green font-bold">Connected</span>
                    </div>
                    <div className="flex items-center justify-between text-wm-text">
                      <span>Telegram Dispatch Hook</span>
                      <span className="text-wm-green font-bold">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-wm-text">
                      <span>Docker Socket Telemetry</span>
                      <span className="text-wm-text font-bold">12/12 Up</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-wm-border flex items-center justify-between text-xs font-mono">
                  <span className="text-wm-muted">Alert Latency</span>
                  <span className="text-wm-green font-bold">&lt; 380ms</span>
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="px-5 py-3 bg-wm-bg border-t border-wm-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs text-wm-muted">
              <div className="flex items-center gap-2 text-wm-text">
                <span className="text-wm-accent font-bold">&gt;</span>
                <span className="text-wm-green">PASS:</span>
                <span className="truncate">Payload assertion `response.code === &quot;SUCCESS&quot;` verified in 38ms</span>
              </div>
              <span className="text-[11px] text-wm-muted">Continuous Schedule: */30s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}