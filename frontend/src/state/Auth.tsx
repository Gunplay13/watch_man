import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SESSION_KEY, User, authApi } from '../lib/authApi';

interface AuthState {
  user: User | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth must be used inside <AuthProvider>');
  return v;
}

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [user, setUser] = useState<User | null>(() => authApi.restore());

  const login = useCallback(async (email: string, password: string, remember: boolean) => {
    setUser(await authApi.login(email, password, remember));
  }, []);
  const register = useCallback(async (name: string, email: string, password: string) => {
    setUser(await authApi.register(name, email, password));
  }, []);
  const logout = useCallback(() => {
    void authApi.logout();
    setUser(null);
  }, []);

  /* Keep tabs in sync: signing out (or in) in one tab updates the others. */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => { if (e.key === SESSION_KEY) setUser(authApi.restore()); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}