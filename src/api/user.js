import http from './http';

export const getPermissions = () => http.get('/permissions');

export const setUser = ({ id, ...data }) => http.patch(`/users/${id}`, data);
