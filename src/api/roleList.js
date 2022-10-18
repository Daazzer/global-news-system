import http from './http';

export const addRole = data => http.post('/roles', {
  type: data.id,
  permissions: [],
  ...data
});

export const setRole = (id, data) => http.patch(`/roles/${id}`, data);
