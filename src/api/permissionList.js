import http from './http';

export const addPermission = data => http.post('/permissions', data);
