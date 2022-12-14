import http from './http';

export const addRole = data => http.post('/roles', {
  type: data.id,
  menus: [],
  ...data
});

export const setRole = (id, data) => http.patch(`/roles/${id}`, data);

export const delRole = id => http.delete(`/roles/${id}`);
