import { useEffect, useState } from 'react';
import type { Cert, Container, Endpoint } from './mock';
import { makeSeries, rng } from './mock';

/* ---------- time ---------- */
export function useNow(ms = 1000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}

export function ago(ts: number, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - ts) / 1000));
  if (s < 5) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export const pad = (n: number, w = 2) => String(n).padStart(w, '0');
export const clock = (ts: number, ms = false) => {
  const d = new Date(ts);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}${ms ? `.${pad(d.getMilliseconds(), 3)}` : ''}`;
};
export const fullStamp = (ts: number) => {
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${clock(ts, true)}`;
};
export const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/* ---------- certificates ---------- */
export function daysUntil(iso: string, now = Date.now()): number {
  const end = new Date(`${iso}T23:59:59`).getTime();
  return Math.ceil((end - now) / 86_400_000);
}
export type CertState = 'valid' | 'expiring' | 'expired';
export function certState(c: Cert, now = Date.now()): CertState {
  const d = daysUntil(c.to, now);
  if (d < 0) return 'expired';
  if (d < 30) return 'expiring';
  return 'valid';
}
export const hostOf = (url: string) => {
  try { return new URL(url).hostname; } catch { return url.replace(/^https?:\/\//, '').split('/')[0]; }
};
export function certFor(endpoint: Endpoint, certs: Cert[]): Cert | undefined {
  const h = hostOf(endpoint.baseUrl);
  return certs
    .filter((c) => { const ch = hostOf(c.domain); return h === ch || h.endsWith(`.${ch}`); })
    .sort((a, b) => hostOf(b.domain).length - hostOf(a.domain).length)[0];
}

/* ---------- health roll-up ---------- */
export type Health = 'healthy' | 'warning' | 'critical';
export const endpointHealth = (e: Endpoint): Health => (e.status >= 500 || e.latency > 1000 ? 'critical' : e.status >= 400 || e.latency > 500 ? 'warning' : 'healthy');
export const certHealth = (c: Cert): Health => { const s = certState(c); return s === 'expired' ? 'critical' : s === 'expiring' ? 'warning' : 'healthy'; };
export const containerHealth = (c: Container): Health => (c.cpu >= 90 || c.disk >= 90 ? 'critical' : c.cpu >= 40 || c.disk >= 70 || c.status === 'Warning' ? 'warning' : 'healthy');

/* ---------- live series hook ---------- */
export function useLiveSeries(seed: number, n: number, base: number, amp: number, spike = 0, spikeAmp = 0, ms = 2500): number[] {
  const [data, setData] = useState(() => makeSeries(seed, n, base, amp, spike, spikeAmp));
  useEffect(() => {
    const r = rng(seed + (Date.now() % 997));
    const id = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        let v = last + (r() - 0.5) * amp * 0.7 + (base - last) * 0.15;
        if (r() < spike) v += spikeAmp * (0.5 + r());
        return [...prev.slice(1), Math.max(0, v)];
      });
    }, ms);
    return () => clearInterval(id);
  }, [seed, base, amp, spike, spikeAmp, ms]);
  return data;
}

/* ---------- persistence + files ---------- */
export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? ({ ...fallback, ...JSON.parse(raw) } as T) : fallback;
  } catch {
    return fallback;
  }
}
export function saveJSON(key: string, value: unknown): void {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage may be blocked */ }
}
export function download(filename: string, text: string, mime = 'text/plain'): void {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
