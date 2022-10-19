import http from './http';

export const addMenu = data => http.post('/menus', {
  state: 1,
  ...data
});

export const setMenu = (id, data) => http.patch(`/menus/${id}`, data);

export const delMenu = id => http.delete(`/menus/${id}`);
