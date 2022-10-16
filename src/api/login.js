import http from './http';

export const getUsers = params => http.get('/users', {
  params: {
    ...params,
    _expand: 'role'
  }
});
