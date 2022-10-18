import http from './http';

export const getPermissions = () => http.get('/permissions');
