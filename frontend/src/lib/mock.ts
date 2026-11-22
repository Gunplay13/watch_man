/* Mock data + generators. Swap these for real API calls later — the UI only
   talks to the AppState context, never to this file directly (except seeds). */

export type Level = 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';

export interface CheckResult { ts: number; status: number; latency: number }

export interface Endpoint {
  id: string;
  name: string;
  baseUrl: string;
  path: string;
  method: Method;
  status: number;
  statusText: string;
  latency: number;
  intervalSec: number;
  lastChecked: number;
  paused: boolean;
  server: string;
  ram: number;
  spark: number[];
  history: CheckResult[];
  dns: number;
  tls: number;
  ttfb: number;
}

export interface Cert {
  id: string;
  domain: string;
  issuer: string;
  tls: string;
  from: string;
  to: string;
  whatsapp: boolean;
  telegram: boolean;
  sans: string[];
  fingerprint: string;
  cipher: string;
  lastScan: number;
}

export interface Container {
  name: string;
  status: 'Running' | 'Warning' | 'Restarting';
  cpu: number;
  ramGb: number;
  disk: number;
  rx: string;
  tx: string;
  uptime: string;
}

export interface LogEntry {
  id: string;
  ts: number;
  level: Level;
  service: string;
  message: string;
  stack?: string;
}

export interface Incident {
  id: string;
  title: string;
  trigger: string;
  service: string;
  severity: 'Critical' | 'Warning';
  detail: string;
  spark: number[];
  acked: boolean;
  muted: boolean;
}

export interface Dispatch {
  id: string;
  ts: number;
  channel: 'WhatsApp' | 'Telegram' | 'Email' | 'Webhook';
  text: string;
}

/* ---------- random helpers ---------- */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeSeries(seed: number, n: number, base: number, amp: number, spike = 0, spikeAmp = 0): number[] {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => {
    let v = base + Math.sin(i / 3 + seed) * amp * 0.5 + (r() - 0.5) * amp;
    if (r() < spike) v += spikeAmp * (0.5 + r());
    return Math.max(0, v);
  });
}

export const uid = (prefix = 'id') => `${prefix}_${Math.random().toString(16).slice(2, 8)}`;

/* ---------- endpoints ---------- */
const STATUS_TEXT: Record<number, string> = {
  200: 'OK', 201: 'Created', 204: 'No Content', 301: 'Moved Permanently', 400: 'Bad Request',
  401: 'Unauthorized', 404: 'Not Found', 500: 'Internal Server Error', 502: 'Bad Gateway',
  503: 'Service Unavailable', 504: 'Gateway Timeout',
};
export const statusText = (code: number) => STATUS_TEXT[code] ?? 'Unknown';

function mkEndpoint(p: Partial<Endpoint> & Pick<Endpoint, 'name' | 'baseUrl' | 'path' | 'method'>, seed: number): Endpoint {
  const now = Date.now();
  const status = p.status ?? 200;
  const latency = p.latency ?? 80;
  const history: CheckResult[] = Array.from({ length: 6 }, (_, i) => ({
    ts: now - (i + 1) * 30_000,
    status: i === 0 && status >= 400 ? status : 200,
    latency: Math.round(latency * (0.8 + ((i * 37) % 10) / 25)),
  }));
  return {
    id: uid('ep'),
    status,
    statusText: statusText(status),
    latency,
    intervalSec: 30,
    lastChecked: now - 12_000,
    paused: false,
    server: 'api-node',
    ram: 0.4,
    spark: makeSeries(seed, 14, latency, latency * 0.25, status >= 500 ? 0.15 : 0.02, latency),
    history,
    dns: 12,
    tls: 45,
    ttfb: Math.max(1, latency - 57),
    ...p,
  };
}

export const seedEndpoints = (): Endpoint[] => [
  mkEndpoint({ name: 'Payment Gateway API', baseUrl: 'https://payments.example.com', path: '/v1/health', method: 'GET', latency: 45, server: 'api-node', ram: 0.0, lastChecked: Date.now() - 12_000 }, 1),
  mkEndpoint({ name: 'Citizen Portal Auth', baseUrl: 'https://citizen.example.com', path: '/auth/status', method: 'POST', latency: 110, intervalSec: 60, server: 'db-postgres', ram: 0.7, lastChecked: Date.now() - 45_000 }, 2),
  mkEndpoint({ name: 'Core Banking Webhook', baseUrl: 'https://bank.outage-example.net', path: '/webhooks/events', method: 'POST', status: 503, latency: 1420, server: 'redis', ram: 0.0, lastChecked: Date.now() - 2_000, dns: 12, tls: 45, ttfb: 1363 }, 3),
  mkEndpoint({ name: 'Public Tax API', baseUrl: 'https://tax.expired-service.org', path: '/api/v2/ping', method: 'GET', latency: 72, intervalSec: 60, server: 'db-postgres', ram: 0.7, lastChecked: Date.now() - 60_000 }, 4),
  mkEndpoint({ name: 'Notification Service', baseUrl: 'https://www.sample.com', path: '/notify/health', method: 'GET', latency: 88, server: 'api-node', ram: 0.2, lastChecked: Date.now() - 20_000 }, 5),
  mkEndpoint({ name: 'Document Store', baseUrl: 'https://docs.example.com', path: '/store/health', method: 'GET', latency: 133, intervalSec: 300, server: 'nginx-proxy', ram: 0.1, lastChecked: Date.now() - 190_000 }, 6),
  mkEndpoint({ name: 'Billing Callback', baseUrl: 'https://billing.example.com', path: '/billing/hook', method: 'POST', latency: 210, server: 'celery-worker', ram: 0.3, lastChecked: Date.now() - 8_000 }, 7),
];

export function simulateCheck(ep: Endpoint): Endpoint {
  const wasFailing = ep.status >= 400;
  const fail = Math.random() < (wasFailing ? 0.6 : 0.08);
  const status = fail ? (Math.random() < 0.5 ? 503 : 500) : 200;
  const latency = fail ? Math.round(900 + Math.random() * 900) : Math.round(35 + Math.random() * 160);
  const ttfb = Math.max(1, latency - 57);
  const ts = Date.now();
  return {
    ...ep,
    status,
    statusText: statusText(status),
    latency,
    lastChecked: ts,
    ttfb,
    spark: [...ep.spark.slice(1), latency],
    history: [{ ts, status, latency }, ...ep.history].slice(0, 8),
  };
}

/* ---------- certificates ---------- */
const hex = (n: number, seed: number) => {
  const r = rng(seed);
  return Array.from({ length: n }, () => Math.floor(r() * 256).toString(16).padStart(2, '0').toUpperCase()).join(':');
};

function mkCert(domain: string, issuer: string, tls: string, from: string, to: string, seed: number, alerts = true): Cert {
  const host = domain.replace(/^https?:\/\//, '');
  return {
    id: uid('cert'),
    domain,
    issuer,
    tls,
    from,
    to,
    whatsapp: alerts,
    telegram: alerts,
    sans: [host.replace(/^www\./, ''), `www.${host.replace(/^www\./, '')}`, `api.${host.replace(/^www\./, '')}`],
    fingerprint: hex(32, seed),
    cipher: tls === 'TLS 1.3' ? 'TLS_AES_256_GCM_SHA384' : 'ECDHE-RSA-AES128-GCM-SHA256',
    lastScan: Date.now() - 3_600_000,
  };
}

export const seedCerts = (): Cert[] => [
  mkCert('https://example.com', "Let's Encrypt", 'TLS 1.3', '2026-08-10', '2027-04-09', 11),
  mkCert('https://outage-example.net', 'DigiCert', 'TLS 1.3', '2025-11-12', '2026-11-29', 12),
  mkCert('https://api.outage-example.net', 'DigiCert', 'TLS 1.3', '2025-11-26', '2026-11-25', 13),
  mkCert('https://legacy.example.org', "Let's Encrypt", 'TLS 1.2', '2026-09-20', '2026-12-19', 14),
  mkCert('https://www.sample.com', 'GlobalSign', 'TLS 1.3', '2026-06-01', '2027-06-01', 15),
  mkCert('https://expired-service.org', 'Sectigo', 'TLS 1.2', '2025-10-10', '2026-11-10', 16, false),
];

/* ---------- containers ---------- */
export const seedContainers = (): Container[] => [
  { name: 'api-node', status: 'Running', cpu: 14, ramGb: 1.2, disk: 15, rx: '1.2 MB/s', tx: '800 KB/s', uptime: '5d 12h' },
  { name: 'db-postgres', status: 'Warning', cpu: 42, ramGb: 4.8, disk: 72, rx: '400 KB/s', tx: '2.1 MB/s', uptime: '12d 4h' },
  { name: 'redis', status: 'Running', cpu: 8, ramGb: 0.5, disk: 10, rx: '500 KB/s', tx: '1.7 MB/s', uptime: '3d 8h' },
  { name: 'nginx-proxy', status: 'Running', cpu: 3, ramGb: 0.13, disk: 5, rx: '420 KB/s', tx: '195 KB/s', uptime: '24d 1h' },
  { name: 'celery-worker', status: 'Running', cpu: 28, ramGb: 1.8, disk: 34, rx: '300 KB/s', tx: '3.4 MB/s', uptime: '5d 12h' },
];

export const ramLabel = (gb: number) => (gb < 1 ? `${Math.round(gb * 1024)} MB` : `${gb.toFixed(1)} GB`);

/* ---------- logs ---------- */
export const SERVICES = ['api-node', 'db-postgres', 'endpoint-checker', 'redis', 'nginx-proxy', 'celery-worker'];

const TEMPLATES: Record<string, { level: Level; msg: string; stack?: string }[]> = {
  'api-node': [
    { level: 'INFO', msg: 'User authentication successful for user "Tino"' },
    { level: 'INFO', msg: 'GET /v1/payments 200 (41ms)' },
    { level: 'WARN', msg: 'API latency high (820ms)' },
    {
      level: 'ERROR',
      msg: 'Connection refused to auth service',
      stack: 'Error: connect ETIMEDOUT 10.0.4.15:443\n    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)',
    },
  ],
  'db-postgres': [
    { level: 'INFO', msg: 'Checkpoint complete: wrote 412 buffers' },
    { level: 'WARN', msg: 'High connection pool usage (87%)' },
    { level: 'ERROR', msg: 'Deadlock detected on relation "payments"', stack: 'ERROR: deadlock detected\nDETAIL: Process 4821 waits for ShareLock on transaction 99211\nHINT: See server log for query details.' },
    { level: 'CRITICAL', msg: 'Database connection lost!' },
  ],
  'endpoint-checker': [
    { level: 'INFO', msg: 'GET /api/v1/status – 200 OK (150ms)' },
    { level: 'WARN', msg: 'GET /webhooks/events – slow response (1420ms)' },
    { level: 'ERROR', msg: 'GET /webhooks/events – 503 Service Unavailable' },
  ],
  redis: [
    { level: 'INFO', msg: 'Background saving terminated with success' },
    { level: 'WARN', msg: 'Memory usage above 80% of maxmemory' },
  ],
  'nginx-proxy': [
    { level: 'INFO', msg: 'upstream api-node healthy' },
    { level: 'WARN', msg: 'upstream timed out (110: Connection timed out)' },
    { level: 'ERROR', msg: '502 Bad Gateway from upstream api-node' },
  ],
  'celery-worker': [
    { level: 'INFO', msg: 'Task reports.generate[7f3a] succeeded in 1.2s' },
    { level: 'WARN', msg: 'Task queue depth 340 (threshold 300)' },
    { level: 'ERROR', msg: 'Task billing.sync[91cc] failed: TimeoutError' },
  ],
};

export function makeLog(ts: number, r: () => number = Math.random): LogEntry {
  const roll = r();
  const level: Level = roll < 0.68 ? 'INFO' : roll < 0.86 ? 'WARN' : roll < 0.97 ? 'ERROR' : 'CRITICAL';
  const matching = SERVICES.flatMap((s) => TEMPLATES[s].filter((t) => t.level === level).map((t) => ({ s, t })));
  const pick = matching[Math.floor(r() * matching.length)];
  return {
    id: `log_${Math.floor(r() * 0xffffff).toString(16).padStart(6, '0')}`,
    ts,
    level,
    service: pick.s,
    message: pick.t.msg,
    stack: pick.t.stack,
  };
}

export function seedLogs(count = 160, spanMs = 20 * 60_000): LogEntry[] {
  const r = rng(77);
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => makeLog(now - (i / count) * spanMs - r() * 2000, r)).sort((a, b) => b.ts - a.ts);
}

export const seedIncidents = (): Incident[] => [
  { id: 'inc1', title: 'High Disk I/O', trigger: '/var/log', service: 'db-postgres', severity: 'Critical', detail: '/var/log is nearly full (91%).', spark: makeSeries(5, 24, 40, 30, 0.1, 30), acked: false, muted: false },
  { id: 'inc2', title: 'HTTP 503 — Core Banking Webhook', trigger: 'HTTP 5xx Error', service: 'redis', severity: 'Critical', detail: 'Endpoint returned 503 Service Unavailable on 3 consecutive checks.', spark: makeSeries(6, 24, 30, 15, 0.12, 80), acked: false, muted: false },
  { id: 'inc3', title: 'SSL Expiry < 14d', trigger: 'api.outage-example.net', service: 'endpoint-checker', severity: 'Warning', detail: 'Certificate expires in under two weeks.', spark: makeSeries(7, 24, 20, 8), acked: false, muted: false },
];

export const seedDispatches = (): Dispatch[] => [
  { id: 'd1', ts: Date.now() - 90_000, channel: 'WhatsApp', text: '[Alert] db-postgres warning (503)' },
  { id: 'd2', ts: Date.now() - 240_000, channel: 'Telegram', text: '[INFO] api-node restarted' },
];
