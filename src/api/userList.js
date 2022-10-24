import { SystemDefault, SystemState } from '@/utils/enums';
import http from './http';

export const getRoles = params => http.get('/roles', { params });

export const addUser = data => http.post('/users', {
  state: SystemState.ENABLED,
  default: SystemDefault.NO,
  likes: [],
  ...data
});

export const setUser = (id, data) => http.patch(`/users/${id}`, data);

export const delUser = id => http.delete(`/users/${id}`);
