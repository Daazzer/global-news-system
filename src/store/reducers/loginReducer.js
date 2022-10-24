import { getUser } from '@/api/login';

const initState = {
  user: null
};

export const setUser = id => async dispatch => {
  const res = await getUser(id, { _expand: ['region', 'role'] });
  const payload = res.data;
  dispatch({ type: 'login/SET_USER', payload });
};

/**
 * 登录模块
 * @param {object} state 
 * @param {import("redux").Action} action 
 */
const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case 'login/SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default loginReducer;