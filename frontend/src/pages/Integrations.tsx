import React, { useState } from 'react';
import { Icon, IconName } from '../components/Icon';
import { AsyncButton, Confirm, Modal, Pill, Toggle, Tone } from '../components/ui';
import { useApp } from '../state/AppState';
import { Dispatch, uid } from '../lib/mock';
import { fullStamp } from '../lib/utils';

type ChannelKey = 'whatsapp' | 'telegram' | 'webhook' | 'email';
type Channel = 'WhatsApp' | 'Telegram' | 'Email' | 'Webhook';
type Severity = 'Critical' | 'Warning' | 'Info';

interface IntegrationCfg { enabled: boolean; fields: Record<string, string> }
interface Rule { id: string; trigger: string; channels: Channel[]; severity: Severity; cooldown: string; on: boolean }

const META: Record<ChannelKey, { title: string; channel: Channel; icon: IconName; iconCls: string; blurb: string; testLabel: string; fields: { key: string; label: string; secret?: boolean }[] }> = {
  whatsapp: {
    title: 'WhatsApp Business API', channel: 'WhatsApp', icon: 'whatsapp', iconCls: 'wm-brandicon--wa', testLabel: 'Test Alert',
    blurb: 'Send alerts to WhatsApp users and groups through the WhatsApp Business API.',
    fields: [{ key: 'token', label: 'Bot Token / Webhook URL', secret: true }, { key: 'target', label: 'Target Phone / Group ID' }],
  },
  telegram: {
    title: 'Telegram Bot API', channel: 'Telegram', icon: 'telegram', iconCls: 'wm-brandicon--tg', testLabel: 'Test Alert',
    blurb: 'Receive alerts in a Telegram chat or channel via your bot.',
    fields: [{ key: 'token', label: 'Bot Token', secret: true }, { key: 'target', label: 'Chat ID' }],
  },
  webhook: {
    title: 'Custom Webhooks', channel: 'Webhook', icon: 'webhook', iconCls: 'wm-brandicon--hook', testLabel: 'Send Test',
    blurb: 'POST a JSON payload to any HTTP endpoint when an alert fires.',
    fields: [{ key: 'target', label: 'Webhook URL' }, { key: 'format', label: 'Payload Format' }],
  },
  email: {
    title: 'Email / SMTP', channel: 'Email', icon: 'mail', iconCls: 'wm-brandicon--mail', testLabel: 'Test Email',
    blurb: 'Deliver alerts to your inbox through any SMTP provider.',
    fields: [{ key: 'target', label: 'SMTP Host' }, { key: 'token', label: 'SMTP Password', secret: true }],
  },
};
const ORDER: ChannelKey[] = ['whatsapp', 'telegram', 'webhook', 'email'];

const DEFAULTS: Record<ChannelKey, IntegrationCfg> = {
  whatsapp: { enabled: true, fields: { token: 'whk_live_9d41c2e7a05b4f1', target: '+233 24 000 0000' } },
  telegram: { enabled: true, fields: { token: '7188422:AAH-example-bot-token', target: '-10045892185' } },
  webhook: { enabled: true, fields: { target: 'https://hooks.example.com/watchman', format: 'JSON' } },
  email: { enabled: true, fields: { target: 'smtp.sendgrid.net', token: 'SG.example-password' } },
};

const TRIGGERS = ['HTTP 5xx Error', 'SSL Expiry < 14d', 'Disk I/O > 85%', 'Node Offline', 'Latency > 1s', 'Container Restart'];
const sevTone = (s: Severity): Tone => (s === 'Critical' ? 'red' : s === 'Warning' ? 'amber' : 'blue');
const chanTone = (c: Channel): Tone => (c === 'WhatsApp' ? 'green' : c === 'Telegram' ? 'blue' : c === 'Email' ? 'blue' : 'purple');
const COOLDOWNS = ['Immediate', '5m', '15m', '1h', '6h'];

const SEED_RULES: Rule[] = [
  { id: 'r1', trigger: 'HTTP 5xx Error', channels: ['WhatsApp', 'Telegram'], severity: 'Critical', cooldown: '5m', on: true },
  { id: 'r2', trigger: 'SSL Expiry < 14d', channels: ['WhatsApp', 'Telegram', 'Email'], severity: 'Warning', cooldown: '1h', on: true },
  { id: 'r3', trigger: 'Disk I/O > 85%', channels: ['WhatsApp'], severity: 'Critical', cooldown: '5m', on: true },
  { id: 'r4', trigger: 'Node Offline', channels: ['Telegram'], severity: 'Critical', cooldown: 'Immediate', on: true },
];

function AddRuleModal({ onClose, onAdd }: { onClose: () => void; onAdd: (r: Rule) => void }): React.JSX.Element {
  const [trigger, setTrigger] = useState(TRIGGERS[4]);
  const [channels, setChannels] = useState<Channel[]>(['WhatsApp']);
  const [severity, setSeverity] = useState<Severity>('Warning');
  const [cooldown, setCooldown] = useState('15m');
  const [error, setError] = useState('');
  const flip = (c: Channel) => setChannels((l) => (l.includes(c) ? l.filter((x) => x !== c) : [...l, c]));
  return (
    <Modal title="Add Routing Rule" onClose={onClose}>
      <form className="wm-form" onSubmit={(e) => {
        e.preventDefault();
        if (!channels.length) { setError('Pick at least one channel.'); return; }
        onAdd({ id: uid('r'), trigger, channels, severity, cooldown, on: true });
      }}>
        <label className="wm-field">Trigger condition<select value={trigger} onChange={(e) => setTrigger(e.target.value)}>{TRIGGERS.map((t) => <option key={t}>{t}</option>)}</select></label>
        <div className="wm-field">Target channels
          <div className="wm-checks">{(['WhatsApp', 'Telegram', 'Email', 'Webhook'] as Channel[]).map((c) => (
            <label key={c}><input type="checkbox" checked={channels.includes(c)} onChange={() => { flip(c); setError(''); }} />{c}</label>
          ))}</div>
        </div>
        <div className="wm-row" style={{ alignItems: 'flex-end' }}>
          <label className="wm-field" style={{ flex: 1 }}>Severity<select value={severity} onChange={(e) => setSeverity(e.target.value as Severity)}>{(['Critical', 'Warning', 'Info'] as Severity[]).map((s) => <option key={s}>{s}</option>)}</select></label>
          <label className="wm-field" style={{ flex: 1 }}>Cooldown<select value={cooldown} onChange={(e) => setCooldown(e.target.value)}>{COOLDOWNS.map((c) => <option key={c}>{c}</option>)}</select></label>
        </div>
        {error && <div className="wm-field-error" role="alert">{error}</div>}
        <div className="wm-modal-foot"><button type="button" className="wm-btn wm-btn--outline" onClick={onClose}>Cancel</button><button type="submit" className="wm-btn">Add Rule</button></div>
      </form>
    </Modal>
  );
}

function Preview({ channel, now }: { channel: Channel; now: number }): React.JSX.Element {
  const stamp = new Date(now).toISOString().replace('T', ' ').slice(0, 16);
  const msg = `🟢 [WATCHMAN ALERT] – CRITICAL\nService: db-postgres\nTrigger: Disk I/O > 85%\nUptime: 5d 12h\nDetails: /var/log is nearly full.\nTimestamp: ${stamp} GMT`;
  const second = `🔴 [WATCHMAN ALERT]\nService: api-node\nStatus: 503 Service Unavailable`;
  const tg = channel === 'Telegram';
  return (
    <div className="wm-phone" aria-label={`${channel} alert preview`}>
      <div className="wm-phone-head"><span className={`wm-brandicon ${tg ? 'wm-brandicon--tg' : 'wm-brandicon--wa'}`} style={{ width: 22, height: 22 }}><Icon name={tg ? 'telegram' : 'whatsapp'} size={13} /></span>{channel === 'WhatsApp' || tg ? 'Watchman Alerts' : `${channel} preview`}</div>
      <div className="wm-phone-body">
        <div className={`wm-bubble${tg ? ' wm-bubble--tg' : ''}`}>{msg}<small>{new Date(now).toTimeString().slice(0, 5)}</small></div>
        <div className={`wm-bubble${tg ? ' wm-bubble--tg' : ''}`}>{second}</div>
      </div>
    </div>
  );
}

export default function Integrations(): React.JSX.Element {
  const { toast, dispatch, muted } = useApp();
  const [cfgs, setCfgs] = useState<Record<ChannelKey, IntegrationCfg>>(DEFAULTS);
  const [draft, setDraft] = useState<Record<ChannelKey, IntegrationCfg>>(DEFAULTS);
  const [sel, setSel] = useState<ChannelKey>('whatsapp');
  const [rules, setRules] = useState<Rule[]>(SEED_RULES);
  const [addingRule, setAddingRule] = useState(false);
  const [deleting, setDeleting] = useState<Rule | null>(null);
  const [reveal, setReveal] = useState(false);

  const meta = META[sel];
  const d = draft[sel];
  const dirty = JSON.stringify(d) !== JSON.stringify(cfgs[sel]);
  const patchField = (k: string, v: string) => setDraft((p) => ({ ...p, [sel]: { ...p[sel], fields: { ...p[sel].fields, [k]: v } } }));

  const sendTest = async (key: ChannelKey) => {
    await new Promise((r) => setTimeout(r, 900));
    const m = META[key];
    if (!cfgs[key].enabled) { toast(`${m.title} is disconnected — connect it first`, 'err'); return; }
    if (muted) { toast('Global mute is on — test not sent', 'err'); return; }
    dispatch({ channel: m.channel as Dispatch['channel'], text: `[TEST] Watchman test alert via ${m.title}` });
    toast(`Test sent via ${m.title}`, 'ok');
  };

  const sevCycle = (id: string, s: Severity) => setRules((l) => l.map((r) => (r.id === id ? { ...r, severity: s } : r)));

  return (
    <div className="wm-page">
      <main className="wm-main">
        <div className="wm-cols-4">
          {ORDER.map((k) => {
            const m = META[k], c = cfgs[k];
            return (
              <div key={k} className="wm-card wm-intcard" role="button" tabIndex={0} aria-pressed={sel === k}
                onClick={() => { setSel(k); setReveal(false); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(k); setReveal(false); } }}>
                <div className="wm-spread"><b style={{ fontSize: 15 }}>{m.title}</b><span className={`wm-brandicon ${m.iconCls}`}><Icon name={m.icon} size={16} /></span></div>
                <div><Pill tone={c.enabled ? 'green' : 'grey'}>{c.enabled ? (k === 'telegram' ? 'Active' : k === 'email' ? 'Configured' : 'Connected') : 'Disconnected'}</Pill></div>
                <p>{m.blurb}</p>
                <div className="wm-note" style={{ wordBreak: 'break-all' }}>{k === 'telegram' ? `Chat ID: ${c.fields.target}` : k === 'email' ? `Host: ${c.fields.target}` : k === 'webhook' ? `Payload Format: ${c.fields.format}` : `Recipient: ${c.fields.target}`}</div>
                <span onClick={(e) => e.stopPropagation()} style={{ marginTop: 'auto' }}>
                  <AsyncButton icon={k === 'email' ? 'mail' : 'send'} className="wm-btn wm-btn--outline wm-btn--sm" onRun={() => sendTest(k)}>{m.testLabel}</AsyncButton>
                </span>
              </div>
            );
          })}
        </div>

        <section className="wm-card">
          <div className="wm-card-head"><h2>Alert Routing Rules</h2><button className="wm-btn wm-btn--sm" onClick={() => setAddingRule(true)}><Icon name="plus" />Add Rule</button></div>
          <div className="wm-table-wrap">
            <table className="wm-table">
              <thead><tr><th>Trigger Condition</th><th>Target Channel</th><th>Severity</th><th>Cooldown</th><th>Status</th><th aria-label="Actions" /></tr></thead>
              <tbody>
                {rules.map((r) => (
                  <tr key={r.id} style={r.on ? undefined : { opacity: 0.6 }}>
                    <td>{r.trigger}</td>
                    <td><span className="wm-row" style={{ gap: 6 }}>{r.channels.map((c) => <Pill key={c} tone={chanTone(c)}>{c}</Pill>)}</span></td>
                    <td><select className="wm-select" aria-label={`Severity for ${r.trigger}`} value={r.severity} onChange={(e) => sevCycle(r.id, e.target.value as Severity)} style={{ padding: '4px 8px' }}>{(['Critical', 'Warning', 'Info'] as Severity[]).map((s) => <option key={s}>{s}</option>)}</select> <Pill tone={sevTone(r.severity)}>{r.severity}</Pill></td>
                    <td>
                      <select className="wm-select" aria-label={`Cooldown for ${r.trigger}`} value={r.cooldown} onChange={(e) => setRules((l) => l.map((x) => (x.id === r.id ? { ...x, cooldown: e.target.value } : x)))} style={{ padding: '4px 8px' }}>
                        {COOLDOWNS.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </td>
                    <td><Toggle on={r.on} label={`Enable rule ${r.trigger}`} onChange={(v) => { setRules((l) => l.map((x) => (x.id === r.id ? { ...x, on: v } : x))); toast(`Rule “${r.trigger}” ${v ? 'enabled' : 'disabled'}`); }} /></td>
                    <td><button className="wm-iconbtn" aria-label={`Delete rule ${r.trigger}`} onClick={() => setDeleting(r)}><Icon name="trash" /></button></td>
                  </tr>
                ))}
                {rules.length === 0 && <tr><td colSpan={6} className="wm-muted" style={{ textAlign: 'center', padding: 24 }}>No routing rules — alerts will not be sent. Add one to get started.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <aside className="wm-aside">
        <div className="wm-aside-head"><h3>Configure: {meta.title}</h3></div>
        <div><Pill tone={cfgs[sel].enabled ? 'green' : 'grey'}>{cfgs[sel].enabled ? 'Connected' : 'Disconnected'}</Pill></div>
        <div className="wm-form">
          {meta.fields.map((f) => (
            <label key={f.key} className="wm-field">{f.label}
              <span className="wm-row" style={{ gap: 4, flexWrap: 'nowrap' }}>
                <input style={{ flex: 1, minWidth: 0 }} type={f.secret && !reveal ? 'password' : 'text'} value={d.fields[f.key] ?? ''} onChange={(e) => patchField(f.key, e.target.value)} autoComplete="off" />
                {f.secret && <>
                  <button type="button" className="wm-iconbtn" aria-label={reveal ? 'Hide secret' : 'Show secret'} onClick={() => setReveal((r) => !r)}><Icon name={reveal ? 'eyeOff' : 'eye'} /></button>
                  <button type="button" className="wm-iconbtn" aria-label="Copy value" onClick={() => { navigator.clipboard?.writeText(d.fields[f.key] ?? ''); toast('Copied', 'ok'); }}><Icon name="copy" /></button>
                </>}
              </span>
            </label>
          ))}
        </div>
        <div className="wm-row">
          <button className="wm-btn wm-btn--sm" disabled={!dirty} onClick={() => { setCfgs((p) => ({ ...p, [sel]: d })); toast(`${meta.title} settings saved`, 'ok'); }}>Save</button>
          <button className="wm-btn wm-btn--outline wm-btn--sm" disabled={!dirty} onClick={() => setDraft((p) => ({ ...p, [sel]: cfgs[sel] }))}>Reset</button>
          <button className={`wm-btn wm-btn--sm ${d.enabled ? 'wm-btn--outline' : ''}`} onClick={() => {
            const next = { ...d, enabled: !d.enabled };
            setDraft((p) => ({ ...p, [sel]: next }));
            setCfgs((p) => ({ ...p, [sel]: { ...p[sel], enabled: next.enabled } }));
            toast(`${meta.title} ${next.enabled ? 'connected' : 'disconnected'}`, next.enabled ? 'ok' : 'info');
          }}>{d.enabled ? 'Disconnect' : 'Connect'}</button>
        </div>
        <div className="wm-aside-section" style={{ borderTop: '1px solid var(--wm-border)', paddingTop: 14 }}>
          <h3>Live Alert Preview</h3>
          <Preview channel={meta.channel === 'Telegram' ? 'Telegram' : 'WhatsApp'} now={Date.now()} />
          <span className="wm-note">Preview rendered {fullStamp(Date.now()).slice(11, 19)} — {meta.channel === 'Telegram' ? 'Telegram' : 'WhatsApp'} format</span>
        </div>
      </aside>

      {addingRule && <AddRuleModal onClose={() => setAddingRule(false)} onAdd={(r) => { setRules((l) => [...l, r]); setAddingRule(false); toast(`Rule “${r.trigger}” added`, 'ok'); }} />}
      {deleting && <Confirm title="Delete routing rule?" message={`Alerts for “${deleting.trigger}” will no longer be sent.`} confirmLabel="Delete" onCancel={() => setDeleting(null)} onConfirm={() => { setRules((l) => l.filter((x) => x.id !== deleting.id)); toast('Rule deleted'); setDeleting(null); }} />}
    </div>
  );
}
