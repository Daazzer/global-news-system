const initState = {
  user: null
};

/**
 * 登录模块
 * @param {object} state 
 * @param {import("redux").Action} action 
 */
const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case 'login/LOGIN':
      return { ...state, user: action.payload };
    case 'login/LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

export default loginReducer;