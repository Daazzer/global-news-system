import { SystemDefault, SystemState } from '@/utils/enums';
import http from './http';

export const addMenu = data => http.post('/menus', {
  state: SystemState.ENABLED,
  default: SystemDefault.NO,
  ...data
});

export const setMenu = (id, data) => http.patch(`/menus/${id}`, data);

export const delMenu = id => http.delete(`/menus/${id}`);
