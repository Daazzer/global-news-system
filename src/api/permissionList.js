import http from './http';

export const addPermission = data => http.post('/permissions', data);

export const setPermission = (id, data) => http.patch(`/permissions/${id}`, data);

