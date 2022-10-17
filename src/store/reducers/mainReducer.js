const initState = {
  permissions: []
};

/**
 * 后台主页模块
 * @param {object} state 
 * @param {import("redux").Action} action 
 */
const mainReducer = (state = initState, action) => {
  switch (action.type) {
    case 'main/SET_PERMISSIONS':
      return { ...state, permissions: action.payload };
    default:
      return state;
  }
}

export default mainReducer;