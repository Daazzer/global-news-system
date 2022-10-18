import { DefaultUser, UserState } from '@/utils/enums';
import http from './http';

export const getRegions = params => http.get('/regions', { params });

export const getRoles = params => http.get('/roles', { params });

export const addUser = data => http.post('/users', {
  state: UserState.ENABLED,
  default: DefaultUser.NO,
  ...data
});

export const setUser = ({ id, ...data }) => http.patch(`/users/${id}`, data);