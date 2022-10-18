import http from './http';

export const getRegions = params => http.get('/regions', { params });

export const getRoles = params => http.get('/roles', { params });