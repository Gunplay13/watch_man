// Shared types for the Watchman frontend.
// These match the Django backend models in Gunplay13/watch_man:
// Watcher (watchers/models.py) and CheckResult (checks/models.py).

export interface User {
  id: number;
  username: string;
  email?: string;
}

export interface Watcher {
  id: number;
  user: number | null;
  name: string;
  url: string;
  interval_seconds: number;
  timeout_seconds: number;
  is_active: boolean;
  created_at: string;
}

export interface WatcherInput {
  name: string;
  url: string;
  interval_seconds?: number;
  timeout_seconds?: number;
  is_active?: boolean;
}

export interface CheckResult {
  id: number;
  watcher: number;
  status_code: number | null;
  response_time_ms: number | null;
  is_success: boolean;
  error_message: string | null;
  checked_at: string;
}

export type WatcherStatus = 'up' | 'degraded' | 'down' | 'unknown';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  email: string;
}
