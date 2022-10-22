import qs from 'qs';
import { PublishState } from '@/utils/enums';
import store from '@/store';
import http from './http';

/** 新闻分类 */
export const getCategories = params => http.get('/categories', { params });

/** 添加新闻 */
export const addNews = data => http.post('/news', {
  publishState: PublishState.UNPUBLISHED,
  userId: store.getState().login.user.id,
  createTime: Date.now(),
  publishTime: 0,
  star: 0,
  view: 9,
  ...data
});

/** 获取新闻列表 */
export const getNews = params => http.get(`/news${params
  ? '?' + qs.stringify(params, { indices: false })
  : ''}`
);

/** 删除新闻 */
export const delNews = id => http.delete(`/news/${id}`);