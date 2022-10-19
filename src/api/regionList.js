import http from './http';

export const getRegions = params => http.get('/regions', { params });
