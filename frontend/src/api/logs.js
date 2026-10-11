// logs — probe results, live status, and history for charts.
import client from './client';

export const getWatcherStatus = (id) => client.get(`/watchers/${id}/status/`);
export const getWatcherLogs = (id, params) => client.get(`/watchers/${id}/logs/`, { params });
export const getAllLogs = (params) => client.get('/logs/', { params });
