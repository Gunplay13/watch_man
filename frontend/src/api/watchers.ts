// watchers — CRUD for monitored endpoints ("watchers").
import client from './client';
import type { Watcher, WatcherInput } from '../types';

export const getWatchers = () => client.get<Watcher[]>('/watchers/');
export const getWatcher = (id: number) => client.get<Watcher>(`/watchers/${id}/`);
export const createWatcher = (data: WatcherInput) => client.post<Watcher>('/watchers/', data);
export const updateWatcher = (id: number, data: Partial<WatcherInput>) =>
  client.put<Watcher>(`/watchers/${id}/`, data);
export const deleteWatcher = (id: number) => client.delete(`/watchers/${id}/`);
