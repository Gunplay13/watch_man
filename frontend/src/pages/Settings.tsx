import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { Confirm, Modal, Pill, Stepper, Toggle } from '../components/ui';
import { useApp } from '../state/AppState';
import { uid } from '../lib/mock';
import { isoDate, loadJSON, saveJSON } from '../lib/utils';

interface EngineSettings {
  checkInterval: number; timeout: number; sslWarnDays: number; retries: number; retentionDays: number; rollup: string;
}
const DEFAULT_SETTINGS: EngineSettings = { checkInterval: 30, timeout: 10, sslWarnDays: 30, retries: 3, retentionDays: 30, rollup: '5m' };
const KEY = 'watchman.settings';

interface Token { id: string; name: string; masked: string; created: string; lastUsed: string }
interface Member { id: string; name: string; email: string; role: 'Admin' | 'Editor' | 'Viewer'; status: 'Active' | 'Invited' }
interface MaintWindow { id: string; name: string; scope: string; start: string; end: string }

const TABS = ['General & Engine', 'API Keys & Tokens', 'Team & RBAC', 'Maintenance Windows'] as const;
type Tab = (typeof TABS)[number];

const randomKey = () => Array.from({ length: 28 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join('');

function TokensCard(): React.JSX.Element {
  const { toast } = useApp();
  const [tokens, setTokens] = useState<Token[]>([
    { id: 't1', name: 'CI/CD Pipeline', masked: 'wm_live_•••••89a2', created: '2026-10-14', lastUsed: '1h ago' },
    { id: 't2', name: 'CLI Watcher', masked: 'wm_live_•••••c274', created: '2026-11-01', lastUsed: '5m ago' },
  ]);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [fresh, setFresh] = useState<string | null>(null);
  const [revoking, setRevoking] = useState<Token | null>(null);

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const key = `wm_live_${randomKey()}`;
    setTokens((l) => [...l, { id: uid('t'), name: name.trim(), masked: `wm_live_•••••${key.slice(-4)}`, created: isoDate(new Date()), lastUsed: 'never' }]);
    setFresh(key);
    setName('');
  };

  return (
    <section className="wm-card">
      <div className="wm-card-head"><h2>API Access Tokens</h2><button className="wm-btn wm-btn--outline wm-btn--sm" onClick={() => { setCreating(true); setFresh(null); }}><Icon name="plus" />Generate New Token</button></div>
      <div className="wm-table-wrap">
        <table className="wm-table">
          <thead><tr><th>Token Name</th><th>Masked Key</th><th>Created Date</th><th>Last Used</th><th aria-label="Actions" /></tr></thead>
          <tbody>
            {tokens.map((t) => (
              <tr key={t.id}><td>{t.name}</td><td>{t.masked}</td><td>{t.created}</td><td>{t.lastUsed}</td>
                <td><button className="wm-btn wm-btn--outline wm-btn--sm" onClick={() => setRevoking(t)}>Revoke</button></td></tr>
            ))}
            {tokens.length === 0 && <tr><td colSpan={5} className="wm-muted" style={{ textAlign: 'center', padding: 24 }}>No tokens. Generate one to use the API or CLI.</td></tr>}
          </tbody>
        </table>
      </div>
      {creating && (
        <Modal title={fresh ? 'Token created' : 'Generate New Token'} onClose={() => setCreating(false)}>
          {fresh ? (
            <>
              <p className="wm-muted" style={{ fontSize: 13 }}>Copy this token now — it won’t be shown again.</p>
              <div className="wm-code" style={{ wordBreak: 'break-all' }}>{fresh}</div>
              <div className="wm-modal-foot">
                <button className="wm-btn wm-btn--outline" onClick={() => { navigator.clipboard?.writeText(fresh); toast('Token copied', 'ok'); }}><Icon name="copy" />Copy</button>
                <button className="wm-btn" onClick={() => setCreating(false)}>Done</button>
              </div>
            </>
          ) : (
            <form className="wm-form" onSubmit={create}>
              <label className="wm-field">Token name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Terraform" autoFocus /></label>
              <div className="wm-modal-foot"><button type="button" className="wm-btn wm-btn--outline" onClick={() => setCreating(false)}>Cancel</button><button type="submit" className="wm-btn" disabled={!name.trim()}>Generate</button></div>
            </form>
          )}
        </Modal>
      )}
      {revoking && <Confirm title="Revoke token?" message={`“${revoking.name}” will stop working immediately. This can’t be undone.`} confirmLabel="Revoke" onCancel={() => setRevoking(null)} onConfirm={() => { setTokens((l) => l.filter((t) => t.id !== revoking.id)); toast(`Revoked ${revoking.name}`); setRevoking(null); }} />}
    </section>
  );
}

function TeamTab(): React.JSX.Element {
  const { toast } = useApp();
  const [members, setMembers] = useState<Member[]>([
    { id: 'm1', name: 'Tino', email: 'tino@example.com', role: 'Admin', status: 'Active' },
    { id: 'm2', name: 'Ama Mensah', email: 'ama@example.com', role: 'Editor', status: 'Active' },
    { id: 'm3', name: 'Kofi Boateng', email: 'kofi@example.com', role: 'Viewer', status: 'Invited' },
  ]);
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Member['role']>('Viewer');
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState<Member | null>(null);

  const invite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setError('Enter a valid email address.'); return; }
    if (members.some((m) => m.email === email)) { setError('That person is already on the team.'); return; }
    setMembers((l) => [...l, { id: uid('m'), name: email.split('@')[0], email, role, status: 'Invited' }]);
    toast(`Invitation sent to ${email}`, 'ok');
    setInviting(false); setEmail(''); setError('');
  };

  return (
    <section className="wm-card">
      <div className="wm-card-head"><h2>Team Members</h2><button className="wm-btn wm-btn--sm" onClick={() => setInviting(true)}><Icon name="plus" />Invite Member</button></div>
      <div className="wm-table-wrap">
        <table className="wm-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th aria-label="Actions" /></tr></thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}><td>{m.name}</td><td>{m.email}</td>
                <td><select className="wm-select" aria-label={`Role for ${m.name}`} value={m.role} onChange={(e) => { setMembers((l) => l.map((x) => (x.id === m.id ? { ...x, role: e.target.value as Member['role'] } : x))); toast(`${m.name} is now ${e.target.value}`); }} style={{ padding: '4px 8px' }}>
                  {['Admin', 'Editor', 'Viewer'].map((r) => <option key={r}>{r}</option>)}</select></td>
                <td><Pill tone={m.status === 'Active' ? 'green' : 'amber'}>{m.status}</Pill></td>
                <td><button className="wm-iconbtn" aria-label={`Remove ${m.name}`} onClick={() => setRemoving(m)}><Icon name="trash" /></button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {inviting && (
        <Modal title="Invite Member" onClose={() => setInviting(false)}>
          <form className="wm-form" onSubmit={invite}>
            <label className="wm-field">Email<input value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="name@company.com" autoFocus /></label>
            <label className="wm-field">Role<select value={role} onChange={(e) => setRole(e.target.value as Member['role'])}>{['Admin', 'Editor', 'Viewer'].map((r) => <option key={r}>{r}</option>)}</select></label>
            {error && <div className="wm-field-error" role="alert">{error}</div>}
            <div className="wm-modal-foot"><button type="button" className="wm-btn wm-btn--outline" onClick={() => setInviting(false)}>Cancel</button><button type="submit" className="wm-btn">Send Invite</button></div>
          </form>
        </Modal>
      )}
      {removing && <Confirm title="Remove member?" message={`${removing.name} will lose access to this workspace.`} confirmLabel="Remove" onCancel={() => setRemoving(null)} onConfirm={() => { setMembers((l) => l.filter((x) => x.id !== removing.id)); toast(`Removed ${removing.name}`); setRemoving(null); }} />}
    </section>
  );
}

function MaintenanceTab(): React.JSX.Element {
  const { toast } = useApp();
  const [wins, setWins] = useState<MaintWindow[]>([{ id: 'w1', name: 'Weekly DB maintenance', scope: 'db-postgres', start: '2026-11-22T02:00', end: '2026-11-22T03:00' }]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', scope: 'All services', start: '', end: '' });
  const [error, setError] = useState('');
  const fmt = (s: string) => new Date(s).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.start || !form.end) { setError('Name, start and end are required.'); return; }
    if (new Date(form.end) <= new Date(form.start)) { setError('End must be after the start.'); return; }
    setWins((l) => [...l, { id: uid('w'), ...form, name: form.name.trim() }]);
    toast('Maintenance window scheduled — alerts will be suppressed', 'ok');
    setAdding(false); setForm({ name: '', scope: 'All services', start: '', end: '' }); setError('');
  };

  return (
    <section className="wm-card">
      <div className="wm-card-head"><div><h2>Maintenance Windows</h2><p>Alerts are suppressed for the chosen scope during a window.</p></div><button className="wm-btn wm-btn--sm" onClick={() => setAdding(true)}><Icon name="plus" />Schedule Window</button></div>
      <div className="wm-table-wrap">
        <table className="wm-table">
          <thead><tr><th>Name</th><th>Scope</th><th>Starts</th><th>Ends</th><th aria-label="Actions" /></tr></thead>
          <tbody>
            {wins.map((w) => <tr key={w.id}><td>{w.name}</td><td>{w.scope}</td><td>{fmt(w.start)}</td><td>{fmt(w.end)}</td>
              <td><button className="wm-iconbtn" aria-label={`Delete ${w.name}`} onClick={() => { setWins((l) => l.filter((x) => x.id !== w.id)); toast('Window deleted'); }}><Icon name="trash" /></button></td></tr>)}
            {wins.length === 0 && <tr><td colSpan={5} className="wm-muted" style={{ textAlign: 'center', padding: 24 }}>No maintenance windows scheduled.</td></tr>}
          </tbody>
        </table>
      </div>
      {adding && (
        <Modal title="Schedule Maintenance Window" onClose={() => setAdding(false)}>
          <form className="wm-form" onSubmit={submit}>
            <label className="wm-field">Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus /></label>
            <label className="wm-field">Scope<select value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })}>{['All services', 'api-node', 'db-postgres', 'redis', 'nginx-proxy', 'celery-worker'].map((s) => <option key={s}>{s}</option>)}</select></label>
            <div className="wm-row"><label className="wm-field" style={{ flex: 1 }}>Starts<input type="datetime-local" value={form.start} onChange={(e) => { setForm({ ...form, start: e.target.value }); setError(''); }} /></label>
              <label className="wm-field" style={{ flex: 1 }}>Ends<input type="datetime-local" value={form.end} onChange={(e) => { setForm({ ...form, end: e.target.value }); setError(''); }} /></label></div>
            {error && <div className="wm-field-error" role="alert">{error}</div>}
            <div className="wm-modal-foot"><button type="button" className="wm-btn wm-btn--outline" onClick={() => setAdding(false)}>Cancel</button><button type="submit" className="wm-btn">Schedule</button></div>
          </form>
        </Modal>
      )}
    </section>
  );
}

export default function Settings(): React.JSX.Element {
  const { muted, setMuted, toast } = useApp();
  const [tab, setTab] = useState<Tab>('General & Engine');
  const [saved, setSaved] = useState<EngineSettings>(() => loadJSON(KEY, DEFAULT_SETTINGS));
  const [draft, setDraft] = useState<EngineSettings>(saved);
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const set = <K extends keyof EngineSettings>(k: K, v: EngineSettings[K]) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <div className="wm-page">
      <main className="wm-main">
        <div className="wm-tabs" role="tablist">
          {TABS.map((t) => <button key={t} role="tab" className="wm-tab" aria-selected={tab === t} onClick={() => setTab(t)}>{t}</button>)}
        </div>

        {tab === 'General & Engine' && (
          <>
            <section className="wm-card">
              <h2 className="wm-section-title">Monitoring Engine</h2>
              <div className="wm-setting-grid">
                <div className="wm-setting">Default HTTP Check Interval<Stepper label="check interval" value={draft.checkInterval} min={5} max={3600} step={5} suffix="s" onChange={(v) => set('checkInterval', v)} /></div>
                <div className="wm-setting">Request Timeout<Stepper label="request timeout" value={draft.timeout} min={1} max={120} suffix="s" onChange={(v) => set('timeout', v)} /></div>
                <div className="wm-setting">SSL Expiry Warning Threshold<Stepper label="SSL warning threshold" value={draft.sslWarnDays} min={1} max={90} suffix=" days" onChange={(v) => set('sslWarnDays', v)} /></div>
                <div className="wm-setting">Retry Count before Alert<Stepper label="retry count" value={draft.retries} min={0} max={10} onChange={(v) => set('retries', v)} /></div>
              </div>
            </section>
            <section className="wm-card">
              <h2 className="wm-section-title">Database &amp; Retention</h2>
              <div className="wm-aside-section" style={{ gap: 14 }}>
                <div className="wm-setting" style={{ justifyContent: 'flex-start', gap: 40 }}>PostgreSQL Storage Status<Pill tone="green" dot>Connected</Pill></div>
                <div className="wm-setting" style={{ justifyContent: 'flex-start', gap: 40 }}><span style={{ minWidth: 190 }}>Log Retention Period</span><Stepper label="log retention" value={draft.retentionDays} min={1} max={365} suffix=" Days" onChange={(v) => set('retentionDays', v)} /></div>
                <div className="wm-setting" style={{ justifyContent: 'flex-start', gap: 40 }}><span style={{ minWidth: 190 }}>Metric Rollup Interval</span>
                  <select className="wm-select" aria-label="Metric rollup interval" value={draft.rollup} onChange={(e) => set('rollup', e.target.value)}>{['1m', '5m', '15m', '1h'].map((r) => <option key={r}>{r}</option>)}</select></div>
              </div>
            </section>
            <TokensCard />
          </>
        )}
        {tab === 'API Keys & Tokens' && <TokensCard />}
        {tab === 'Team & RBAC' && <TeamTab />}
        {tab === 'Maintenance Windows' && <MaintenanceTab />}
      </main>

      <aside className="wm-aside">
        <div className="wm-aside-head"><h3>System Info &amp; Maintenance</h3></div>
        <div className="wm-aside-section">
          <b>System Specs</b>
          <div>Watchman Core v2.4.1</div>
          <div className="wm-muted">Python / httpx worker status:</div>
          <div className="wm-ok">● Running</div>
        </div>
        <div className="wm-aside-section" style={{ borderTop: '1px solid var(--wm-border)', paddingTop: 14 }}>
          <b>Emergency Controls</b>
          <div className="wm-spread">Global Mute Alerts<Toggle on={muted} label="Global mute alerts" onChange={(v) => { setMuted(v); toast(v ? 'All alerts muted' : 'Alerts resumed', v ? 'err' : 'ok'); }} /></div>
          {muted && <div className="wm-note wm-bad">No alerts will be dispatched until this is turned off.</div>}
        </div>
        <div className="wm-aside-foot">
          <button className="wm-btn" disabled={!dirty} onClick={() => { setSaved(draft); saveJSON(KEY, draft); toast('Settings saved', 'ok'); }}>Save Changes</button>
          <button className="wm-btn wm-btn--ghost" disabled={!dirty} onClick={() => { setDraft(saved); toast('Changes discarded'); }}>Discard</button>
        </div>
      </aside>
    </div>
  );
}
