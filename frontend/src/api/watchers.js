// watchers — CRUD for monitored endpoints ("watchers").
import client from './client';

export const getWatchers = () => client.get('/watchers/');
export const getWatcher = (id) => client.get(`/watchers/${id}/`);
export const createWatcher = (data) => client.post('/watchers/', data);
export const updateWatcher = (id, data) => client.put(`/watchers/${id}/`, data);
export const deleteWatcher = (id) => client.delete(`/watchers/${id}/`);
