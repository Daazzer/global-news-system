import http from './http';

export const addRole = data => http.post('/roles', {
  type: data.id,
  permissions: [],
  ...data
});
