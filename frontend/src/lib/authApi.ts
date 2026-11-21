/* Mock auth backend — DEV ONLY.
   This is the single swap point for real authentication: replace the bodies of
   login / register / logout / restore / requestPasswordReset with calls to your API
   (keep the same signatures) and nothing else in the UI has to change.
   Passwords here are stored in plain text in the browser purely so the demo works. */

export type Role = 'Admin' | 'Editor' | 'Viewer';
export interface User { id: string; name: string; email: string; role: Role }

export class AuthError extends Error {
  field: 'email' | 'password' | 'form';
  constructor(message: string, field: 'email' | 'password' | 'form' = 'form') {
    super(message);
    this.name = 'AuthError';
    this.field = field;
  }
}

interface StoredUser extends User { password: string }

const USERS_KEY = 'watchman.mock.users';
export const SESSION_KEY = 'watchman.mock.session';

export const DEMO_CREDENTIALS = { email: 'admin@watchman.io', password: 'Watchman123!' };
const DEMO_USER: StoredUser = { id: 'u_demo', name: 'Tino', email: DEMO_CREDENTIALS.email, password: DEMO_CREDENTIALS.password, role: 'Admin' };

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const clean = (u: StoredUser): User => ({ id: u.id, name: u.name, email: u.email, role: u.role });

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw) as StoredUser[];
  } catch { /* storage unavailable or corrupt — fall back to the demo user */ }
  return [DEMO_USER];
}
function writeUsers(list: StoredUser[]): void {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(list)); } catch { /* ignore */ }
}
function saveSession(user: User, remember: boolean): void {
  const store = remember ? localStorage : sessionStorage;
  try {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    store.setItem(SESSION_KEY, JSON.stringify(user));
  } catch { /* ignore */ }
}

export const authApi = {
  async login(email: string, password: string, remember: boolean): Promise<User> {
    await sleep(700);
    const found = readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) throw new AuthError('Incorrect email or password.');
    const user = clean(found);
    saveSession(user, remember);
    return user;
  },

  async register(name: string, email: string, password: string): Promise<User> {
    await sleep(800);
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new AuthError('An account with this email already exists.', 'email');
    }
    const created: StoredUser = { id: `u_${Math.random().toString(16).slice(2, 10)}`, name, email, password, role: 'Editor' };
    writeUsers([...users, created]);
    const user = clean(created);
    saveSession(user, true);
    return user;
  },

  async logout(): Promise<void> {
    try { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
  },

  /** Synchronous: returns the signed-in user from a previous visit, if any. */
  restore(): User | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  },

  /** Always resolves, so the UI never reveals whether an email has an account. */
  async requestPasswordReset(_email: string): Promise<void> {
    await sleep(800);
  },
};