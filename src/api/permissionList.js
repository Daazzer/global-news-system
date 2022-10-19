import http from './http';

export const addPermission = data => http.post('/permissions', {
  state: 1,
  ...data
});

export const setPermission = (id, data) => http.patch(`/permissions/${id}`, data);

export const delPermission = id => http.delete(`/permissions/${id}`);
