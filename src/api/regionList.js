import { SystemDefault } from '@/utils/enums';
import http from './http';

export const addRegion = data => http.post('/regions', {
  default: SystemDefault.NO,
  ...data
});

export const getRegions = params => http.get('/regions', { params });

export const setRegion = (id, data) => http.patch(`/regions/${id}`, data);

export const delRegion = id => http.delete(`/regions/${id}`);
