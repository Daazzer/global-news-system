import { PublishState } from '@/utils/enums';
import store from '@/store';
import http from './http';

/** 新闻分类 */
export const getCategories = params => http.get('/categories', { params });

export const addNews = data => http.post('/news', {
  publishState: PublishState.UNPUBLISHED,
  userId: store.getState().login.user.id,
  createTime: Date.now(),
  publishTime: 0,
  star: 0,
  view: 9,
  ...data
});
