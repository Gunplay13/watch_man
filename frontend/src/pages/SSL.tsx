import React, { useMemo, useState } from 'react';
import { Icon } from '../components/Icon';
import { AsyncButton, Confirm, Empty, Modal, Pill, Stat } from '../components/ui';
import { useApp } from '../state/AppState';
import { Cert, rng, uid } from '../lib/mock';
import { CertState, certState, daysUntil, hostOf, isoDate, useNow } from '../lib/utils';

const ISSUERS = ["Let's Encrypt", 'DigiCert', 'Sectigo', 'GlobalSign'];

function fabricateCert(domain: string): Cert {
  const host = hostOf(domain);
  const r = rng(host.length * 131 + host.charCodeAt(0));
  const issuer = ISSUERS[Math.floor(r() * ISSUERS.length)];
  const from = new Date(); from.setDate(from.getDate() - Math.floor(r() * 60));
  const to = new Date(from); to.setDate(to.getDate() + (issuer === "Let's Encrypt" ? 90 : 365));
  const tls = r() > 0.2 ? 'TLS 1.3' : 'TLS 1.2';
  const fp = Array.from({ length: 32 }, () => Math.floor(r() * 256).toString(16).padStart(2, '0').toUpperCase()).join(':');
  const bare = host.replace(/^www\./, '');
  return {
    id: uid('cert'), domain: `https://${host}`, issuer, tls, from: isoDate(from), to: isoDate(to), whatsapp: true, telegram: true,
    sans: [bare, `www.${bare}`], fingerprint: fp, cipher: tls === 'TLS 1.3' ? 'TLS_AES_256_GCM_SHA384' : 'ECDHE-RSA-AES128-GCM-SHA256', lastScan: Date.now(),
  };
}

function AddDomainModal({ onClose }: { onClose: () => void }): React.JSX.Element {
  const { addCert, certs, toast } = useApp();
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = domain.trim();
    if (!raw) { setError('Enter a domain to monitor.'); return; }
    let host: string;
    try { host = new URL(/^https?:\/\//.test(raw) ? raw : `https://${raw}`).hostname; } catch { setError('That doesn’t look like a valid domain.'); return; }
    if (!host.includes('.')) { setError('Enter a full domain such as example.com'); return; }
    if (certs.some((c) => hostOf(c.domain) === host)) { setError(`${host} is already being monitored.`); return; }
    addCert(fabricateCert(host));
    toast(`Now monitoring ${host}`, 'ok');
    onClose();
  };
  return (
    <Modal title="Add Domain" onClose={onClose}>
      <form className="wm-form" onSubmit={submit}>
        <label className="wm-field">Domain<input value={domain} onChange={(e) => { setDomain(e.target.value); setError(''); }} placeholder="example.com" autoFocus /></label>
        <p className="wm-note" style={{ margin: 0 }}>Watchman will fetch the certificate chain and alert before it expires. Alerts default to WhatsApp and Telegram.</p>
        {error && <div className="wm-field-error" role="alert">{error}</div>}
        <div className="wm-modal-foot">
          <button type="button" className="wm-btn wm-btn--outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="wm-btn">Add Domain</button>
        </div>
      </form>
    </Modal>
  );
}

export default function SSL(): React.JSX.Element {
  const { certs, updateCert, removeCert, toast } = useApp();
  const now = useNow(60_000);
  const [q, setQ] = useState('');
  const [statusF, setStatusF] = useState<'all' | CertState>('all');
  const [issuerF, setIssuerF] = useState('all');
  const [selId, setSelId] = useState<string | null>(certs[0]?.id ?? null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<Cert | null>(null);

  const issuers = useMemo(() => Array.from(new Set(certs.map((c) => c.issuer))), [certs]);
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return certs
      .filter((c) => (!s || c.domain.toLowerCase().includes(s)) && (statusF === 'all' || certState(c, now) === statusF) && (issuerF === 'all' || c.issuer === issuerF))
      .sort((a, b) => daysUntil(a.to, now) - daysUntil(b.to, now));
  }, [certs, q, statusF, issuerF, now]);

  const counts = useMemo(() => ({
    valid: certs.filter((c) => certState(c, now) === 'valid').length,
    expiring: certs.filter((c) => certState(c, now) === 'expiring').length,
    expired: certs.filter((c) => certState(c, now) === 'expired').length,
  }), [certs, now]);

  const sel = certs.find((c) => c.id === selId) ?? null;
  const selState = sel ? certState(sel, now) : null;

  const dayCell = (c: Cert) => {
    const d = daysUntil(c.to, now);
    const st = certState(c, now);
    const pct = st === 'expired' ? 0 : Math.min(100, (d / 90) * 100);
    const cls = st === 'valid' ? 'wm-bar-teal' : st === 'expiring' ? 'wm-bar-amber' : 'wm-bar-red';
    return (
      <span className="wm-days">
        <span className="wm-bar"><i className={cls} style={{ width: `${pct}%` }} /></span>
        {st === 'expired' ? <Pill tone="red">Expired</Pill> : <Pill tone={st === 'valid' ? 'green' : 'amber'}>{d} day{d === 1 ? '' : 's'} remaining</Pill>}
      </span>
    );
  };

  return (
    <div className="wm-page">
      <main className="wm-main">
        <h1 className="wm-page-title">SSL / TLS Tracker</h1>
        <div className="wm-cols-4">
          <Stat label="Monitored Certificates" value={certs.length} />
          <Stat label="● Valid (>30d)" value={counts.valid} />
          <Stat label="● Expiring Soon (<30d)" value={counts.expiring} />
          <Stat label="● Expired / Invalid" value={counts.expired} tone={counts.expired ? 'red' : undefined} />
        </div>

        <div className="wm-toolbar">
          <div className="wm-input-icon"><Icon name="search" /><input className="wm-input" placeholder="Filter domains…" aria-label="Filter domains" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <select className="wm-select" aria-label="Filter by status" value={statusF} onChange={(e) => setStatusF(e.target.value as 'all' | CertState)}>
            <option value="all">Status: All</option><option value="valid">Valid</option><option value="expiring">Expiring soon</option><option value="expired">Expired</option>
          </select>
          <select className="wm-select" aria-label="Filter by issuer" value={issuerF} onChange={(e) => setIssuerF(e.target.value)}>
            <option value="all">Issuer: All</option>{issuers.map((i) => <option key={i}>{i}</option>)}
          </select>
          <span className="wm-spacer" />
          <button className="wm-btn" onClick={() => setAdding(true)}><Icon name="plus" />Add Domain</button>
        </div>

        <section className="wm-card">
          <div className="wm-card-head"><h2>SSL Certificates</h2><span className="wm-note">{rows.length} of {certs.length} shown</span></div>
          <div className="wm-table-wrap">
            <table className="wm-table">
              <thead><tr><th>Domain Name</th><th>Certificate Issuer</th><th>TLS Version</th><th>Valid From</th><th>Expiry Date</th><th>Days Remaining</th><th>Auto-Alerts</th><th aria-label="Actions" /></tr></thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} className={`wm-clickable${c.id === selId ? ' wm-selected' : ''}`} onClick={() => setSelId(c.id)}>
                    <td>{c.domain}</td><td>{c.issuer}</td><td>{c.tls}</td><td>{c.from}</td><td>{c.to}</td>
                    <td>{dayCell(c)}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <span className="wm-row" style={{ gap: 4, flexWrap: 'nowrap' }}>
                        <button className="wm-iconbtn" aria-pressed={c.whatsapp} aria-label={`WhatsApp alerts for ${c.domain}`} title={`WhatsApp alerts ${c.whatsapp ? 'on' : 'off'}`}
                          style={{ color: c.whatsapp ? 'var(--wm-green)' : undefined, opacity: c.whatsapp ? 1 : 0.45 }}
                          onClick={() => updateCert(c.id, { whatsapp: !c.whatsapp })}><Icon name="whatsapp" size={18} /></button>
                        <button className="wm-iconbtn" aria-pressed={c.telegram} aria-label={`Telegram alerts for ${c.domain}`} title={`Telegram alerts ${c.telegram ? 'on' : 'off'}`}
                          style={{ color: c.telegram ? 'var(--wm-blue)' : undefined, opacity: c.telegram ? 1 : 0.45 }}
                          onClick={() => updateCert(c.id, { telegram: !c.telegram })}><Icon name="telegram" size={18} /></button>
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}><button className="wm-iconbtn" aria-label={`Remove ${c.domain}`} title="Stop monitoring" onClick={() => setDeleting(c)}><Icon name="trash" /></button></td>
                  </tr>
                ))}
                {rows.length === 0 && <tr className="wm-table-empty"><td colSpan={8}><Empty title="No certificates match">Adjust the filters or add a domain.</Empty></td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <aside className="wm-aside">
        <div className="wm-aside-head"><h3>Certificate Inspector</h3>{sel && <button className="wm-iconbtn" aria-label="Close inspector" onClick={() => setSelId(null)}><Icon name="close" /></button>}</div>
        {!sel ? <Empty title="Nothing selected">Select a certificate to inspect it.</Empty> : (
          <>
            <div className="wm-aside-section">
              <div><span className="wm-muted">Inspect:</span> {sel.domain}</div>
              <div><Pill tone={selState === 'valid' ? 'green' : selState === 'expiring' ? 'amber' : 'red'}>{selState === 'valid' ? 'Active' : selState === 'expiring' ? 'Expiring soon' : 'Expired'}</Pill></div>
            </div>
            <div className="wm-aside-section"><span className="wm-muted">Subject Alternative Names (SANs)</span><div>{sel.sans.join(', ')}</div></div>
            <div className="wm-aside-section"><span className="wm-muted">SHA-256 Fingerprint</span><div className="wm-code" style={{ wordBreak: 'break-all' }}>{sel.fingerprint}</div></div>
            <div className="wm-aside-section"><span className="wm-muted">Issuer</span><div>{sel.issuer}</div></div>
            <div className="wm-aside-section"><span className="wm-muted">Cipher Suite</span><div>{sel.cipher}</div></div>
            <div className="wm-aside-section"><span className="wm-muted">Last scanned</span><div>{new Date(sel.lastScan).toLocaleString()}</div></div>
            <div className="wm-aside-foot" style={{ justifyContent: 'stretch' }}>
              <AsyncButton icon="refresh" className="wm-btn wm-btn--outline" onRun={async () => {
                await new Promise((r) => setTimeout(r, 1200));
                updateCert(sel.id, { lastScan: Date.now() });
                toast(`Re-scanned ${hostOf(sel.domain)}`, 'ok');
              }}>Force Re-scan</AsyncButton>
            </div>
          </>
        )}
      </aside>

      {adding && <AddDomainModal onClose={() => setAdding(false)} />}
      {deleting && (
        <Confirm title="Stop monitoring?" message={`${hostOf(deleting.domain)} will be removed from the SSL / TLS tracker.`} confirmLabel="Remove"
          onCancel={() => setDeleting(null)}
          onConfirm={() => { removeCert(deleting.id); if (selId === deleting.id) setSelId(null); toast(`Removed ${hostOf(deleting.domain)}`); setDeleting(null); }} />
      )}
    </div>
  );
}
