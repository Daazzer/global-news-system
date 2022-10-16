import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const config = {
  key: process.env.REACT_APP_NAME + ':style',
  storage,
  whitelist: ['collapsed']
};

const initState = {
  loading: false,  // 全局加载状态
  collapsed: false
};

/**
 * 全局样式模块
 * @param {object} state 
 * @param {import("redux").Action} action 
 */
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'style/SET_LOADING':
      return { ...state, loading: action.payload };
    case 'style/TOGGLE_COLLAPSED':
      return { ...state, collapsed: !state.collapsed };
    default:
      return state;
  }
}

const styleReducer = persistReducer(config, reducer);

export default styleReducer;