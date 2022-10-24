import qs from 'qs';
import { PublishState } from '@/utils/enums';
import store from '@/store';
import http from './http';

/** 添加新闻 */
export const addNews = data => http.post('/news', {
  publishState: PublishState.UNPUBLISHED,
  userId: store.getState().login.user.id,
  createTime: Date.now(),
  publishTime: 0,
  like: 0,
  view: 9,
  ...data
});

/** 修改新闻 */
export const setNews = (id, data) => http.patch(`/news/${id}`, data);

/** 获取新闻列表 */
export const getNews = params => http.get(`/news${params
  ? '?' + qs.stringify(params, { indices: false })
  : ''}`
);

/** 获取新闻详情 */
export const getNewsDetail = (id, params) => http.get(`/news/${id}${params
  ? '?' + qs.stringify(params, { indices: false })
  : ''}`
);

/** 删除新闻 */
export const delNews = id => http.delete(`/news/${id}`);

/** 获取新闻分类列表 */
export const getCategories = params => http.get('/categories', { params });

/** 新增新闻分类 */
export const addCategory = data => http.post('/categories', data);

/** 设置新闻分类 */
export const setCategory = (id, data) => http.patch(`/categories/${id}`, data);

/** 删除新闻分类 */
export const delCategory = id => http.delete(`/categories/${id}`);