// AuthContext — holds the logged-in user + token for the whole app.
// Wrap <App /> in <AuthProvider> in main routes; read via useAuth().
import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

export interface AuthContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  // TODO: login(), logout(), and session restore on page load.

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
