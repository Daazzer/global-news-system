import qs from 'qs';
import http from './http';

export const getUser = (id, params) => http.get(`/users/${id}${params
  ? '?' + qs.stringify(params, { indices: false })
  : ''}`
);

export const getUsers = params => http.get(`/users${params
  ? '?' + qs.stringify(params, { indices: false })
  : ''}`
);
