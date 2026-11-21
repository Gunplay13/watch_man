import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Cert, Container, Dispatch, Endpoint, Incident, LogEntry,
  makeLog, seedCerts, seedContainers, seedDispatches, seedEndpoints, seedIncidents, seedLogs,
  simulateCheck, uid,
} from '../lib/mock';

export interface Toast { id: number; text: string; kind: 'ok' | 'err' | 'info' }

interface AppState {
  endpoints: Endpoint[];
  addEndpoint: (e: Endpoint) => void;
  removeEndpoint: (id: string) => void;
  runCheck: (id: string) => Promise<void>;
  togglePauseEndpoint: (id: string) => void;

  certs: Cert[];
  addCert: (c: Cert) => void;
  updateCert: (id: string, patch: Partial<Cert>) => void;
  removeCert: (id: string) => void;

  containers: Container[];
  restartContainer: (name: string) => void;

  logs: LogEntry[];
  clearLogs: () => void;
  paused: boolean;
  setPaused: (p: boolean) => void;

  incidents: Incident[];
  updateIncident: (id: string, patch: Partial<Incident>) => void;
  dispatches: Dispatch[];
  dispatch: (d: Omit<Dispatch, 'id' | 'ts'>) => void;
  clearDispatches: () => void;

  muted: boolean;
  setMuted: (m: boolean) => void;

  toasts: Toast[];
  toast: (text: string, kind?: Toast['kind']) => void;
}

const Ctx = createContext<AppState | null>(null);

export function useApp(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used inside <AppStateProvider>');
  return v;
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function AppStateProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(seedEndpoints);
  const [certs, setCerts] = useState<Cert[]>(seedCerts);
  const [containers, setContainers] = useState<Container[]>(seedContainers);
  const [logs, setLogs] = useState<LogEntry[]>(() => seedLogs());
  const [paused, setPaused] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>(seedIncidents);
  const [dispatches, setDispatches] = useState<Dispatch[]>(seedDispatches);
  const [muted, setMuted] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  const toast = useCallback((text: string, kind: Toast['kind'] = 'info') => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, text, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const dispatch = useCallback((d: Omit<Dispatch, 'id' | 'ts'>) => {
    setDispatches((list) => [{ ...d, id: uid('d'), ts: Date.now() }, ...list].slice(0, 30));
  }, []);

  /* ----- endpoints ----- */
  const addEndpoint = useCallback((e: Endpoint) => setEndpoints((l) => [e, ...l]), []);
  const removeEndpoint = useCallback((id: string) => setEndpoints((l) => l.filter((e) => e.id !== id)), []);
  const togglePauseEndpoint = useCallback((id: string) => setEndpoints((l) => l.map((e) => (e.id === id ? { ...e, paused: !e.paused } : e))), []);
  const runCheck = useCallback(async (id: string) => {
    await sleep(600);
    setEndpoints((l) => l.map((e) => (e.id === id ? simulateCheck(e) : e)));
  }, []);

  /* ----- certs ----- */
  const addCert = useCallback((c: Cert) => setCerts((l) => [c, ...l]), []);
  const updateCert = useCallback((id: string, patch: Partial<Cert>) => setCerts((l) => l.map((c) => (c.id === id ? { ...c, ...patch } : c))), []);
  const removeCert = useCallback((id: string) => setCerts((l) => l.filter((c) => c.id !== id)), []);

  /* ----- containers ----- */
  const restartContainer = useCallback((name: string) => {
    setContainers((l) => l.map((c) => (c.name === name ? { ...c, status: 'Restarting' } : c)));
    toast(`Restarting ${name}…`);
    setTimeout(() => {
      setContainers((l) => l.map((c) => (c.name === name ? { ...c, status: 'Running', uptime: '0m', cpu: Math.min(c.cpu, 20) } : c)));
      toast(`${name} restarted`, 'ok');
      if (!mutedRef.current) dispatch({ channel: 'Telegram', text: `[INFO] ${name} restarted` });
    }, 2000);
  }, [toast, dispatch]);

  /* ----- live log stream (shared by Dashboard + Log Streamer) ----- */
  const clearLogs = useCallback(() => setLogs([]), []);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const entry = makeLog(Date.now());
      setLogs((l) => [entry, ...l].slice(0, 600));
      if ((entry.level === 'CRITICAL' || entry.level === 'ERROR') && !mutedRef.current && Math.random() < 0.5) {
        const channel = Math.random() < 0.5 ? 'WhatsApp' : 'Telegram';
        setDispatches((list) => [{ id: uid('d'), ts: entry.ts, channel: channel as Dispatch['channel'], text: `[${entry.level}] ${entry.service}: ${entry.message}` }, ...list].slice(0, 30));
      }
    }, 1800);
    return () => clearInterval(id);
  }, [paused]);

  const updateIncident = useCallback((id: string, patch: Partial<Incident>) => setIncidents((l) => l.map((i) => (i.id === id ? { ...i, ...patch } : i))), []);
  const clearDispatches = useCallback(() => setDispatches([]), []);

  const value = useMemo<AppState>(() => ({
    endpoints, addEndpoint, removeEndpoint, runCheck, togglePauseEndpoint,
    certs, addCert, updateCert, removeCert,
    containers, restartContainer,
    logs, clearLogs, paused, setPaused,
    incidents, updateIncident, dispatches, dispatch, clearDispatches,
    muted, setMuted,
    toasts, toast,
  }), [endpoints, addEndpoint, removeEndpoint, runCheck, togglePauseEndpoint, certs, addCert, updateCert, removeCert, containers, restartContainer, logs, clearLogs, paused, incidents, updateIncident, dispatches, dispatch, clearDispatches, muted, toasts, toast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
