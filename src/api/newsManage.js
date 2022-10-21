import http from './http';

/** 新闻分类 */
export const getCategories = params => http.get('/categories', { params });