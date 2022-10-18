import http from './http';

export const getUsers = params => http.get('/users', {
  params: {
    _expand: 'role',
    ...params
  }
});
