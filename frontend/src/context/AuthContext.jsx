// AuthContext — holds the logged-in user + token for the whole app.
// Wrap <App /> in <AuthProvider> in main routes; read via useAuth().
import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // TODO: login(), logout(), and session restore on page load.

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
