import React from 'react';
import { Send, Hash, MessageSquare, Mail, Radio } from 'lucide-react';

const CHANNELS = [
  {
    name: 'Telegram',
    icon: Send,
    tag: 'Bot Push',
    desc: 'Direct alerts with status codes, latency spikes, and error payloads.',
  },
  {
    name: 'Slack',
    icon: Hash,
    tag: 'Incoming Webhook',
    desc: 'Push outage alerts straight to your team on-call or incident channel.',
  },
  {
    name: 'WhatsApp',
    icon: MessageSquare,
    tag: 'Direct Chat',
    desc: 'High-priority incident dispatch sent straight to engineering leads.',
  },
  {
    name: 'Email',
    icon: Mail,
    tag: 'Post-Mortem',
    desc: 'Detailed incident breakdown with downtime duration and error logs.',
  },
  {
    name: 'Discord',
    icon: Radio,
    tag: 'Server Webhook',
    desc: 'Instant downtime notifications delivered to your dev or infra server.',
  },
];

export default function AlertChannelsSection(): React.JSX.Element {
  return (
    <section id="channels" className="w-full border-b border-dashed border-wm-border bg-wm-surface/20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border py-24 md:py-32 px-4 md:px-12">
          {/* Header */}
          <div className="max-w-xl mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text mb-3">
              Instant alerts on your favorite channel
            </h2>
            <p className="text-sm font-normal text-wm-muted leading-relaxed">
              Just select your channel and have alerts sent to you. Simple.
            </p>
          </div>

          {/* 5-Channel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CHANNELS.map((ch) => {
              const IconComp = ch.icon;
              return (
                <div
                  key={ch.name}
                  className="rounded-lg border border-wm-border bg-wm-surface p-5 flex flex-col justify-between hover:border-wm-accent/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-md bg-wm-surface-2 border border-wm-border flex items-center justify-center text-wm-accent">
                        <IconComp size={15} strokeWidth={2} />
                      </div>
                      <span className="font-mono text-[10px] text-wm-muted">{ch.tag}</span>
                    </div>
                    <div className="text-sm font-semibold text-wm-text mb-1.5">
                      {ch.name}
                    </div>
                    <p className="text-xs font-normal text-wm-muted leading-relaxed">
                      {ch.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}