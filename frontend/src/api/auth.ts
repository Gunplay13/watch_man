// auth — signup / login / logout calls to the Django gateway.
import client from './client';
import type { LoginCredentials, RegisterData, User } from '../types';

export const register = (data: RegisterData) => client.post<User>('/auth/register/', data);
export const login = (data: LoginCredentials) => client.post<{ token: string; user: User }>('/auth/login/', data);
export const logout = () => client.post('/auth/logout/');
