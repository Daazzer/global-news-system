import axios from 'axios';
import { message } from 'antd';
import store from '@/store';

const setLoading = payload => store.dispatch({ type: 'style/SET_LOADING', payload });

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_API
});

const errHandler = err => {
  setLoading(false);
  message.error(err.message);
  return Promise.reject(err);
};

http.interceptors.request.use(config => {
  setLoading(true);
  return config;
}, errHandler);

http.interceptors.response.use(res => {
  setLoading(false);
  return res;
}, errHandler);

export default http;