import qs from 'qs';
import http from './http';

export const getUsers = params => http.get(`/users${params
  ? '?' + qs.stringify(params, { indices: false })
  : ''}`
);
