// useAuth — shortcut for reading AuthContext anywhere.
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { AuthContextValue } from '../context/AuthContext';

export default function useAuth(): AuthContextValue | null {
  return useContext(AuthContext);
}
