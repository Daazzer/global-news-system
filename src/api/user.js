import http from './http';

export const getMenus = () => http.get('/menus');
