import { getMenus } from '@/api/user';
import { SystemState } from '@/utils/enums';

const initState = {
  menus: [],  // 所有菜单权限
  userMenus: []  // 当前用户菜单权限
};

export const setAllMenus = async (dispatch, getState) => {
  const res = await getMenus();
  const menus = res.data;
  const { user } = getState().login;
  const roleMenus = user?.role.menus || [];
  // 判断当前用户的权限
  const userMenus = menus.filter(menu => {
    const { id, state } = menu;
    if (roleMenus.includes('*')) return true;
    return (
      roleMenus.includes(id) &&
      state === SystemState.ENABLED
    );
  });

  dispatch({ type: 'main/SET_MENUS', payload: menus });
  dispatch({ type: 'main/SET_USER_MENUS', payload: userMenus });
};

/**
 * 后台主页模块
 * @param {object} state
 * @param {import("redux").Action} action
 * @returns {object}
 */
const mainReducer = (state = initState, action) => {
  switch (action.type) {
    case 'main/SET_MENUS':
      return { ...state, menus: action.payload };
    case 'main/SET_USER_MENUS':
      return { ...state, userMenus: action.payload };
    default:
      return state;
  }
}

export default mainReducer;