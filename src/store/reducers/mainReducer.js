import { getCategories } from '@/api/newsManage';
import { getRegions } from '@/api/regionList';
import { getMenus } from '@/api/user';
import { SystemState } from '@/utils/enums';

const initState = {
  menus: [],  // 所有菜单权限
  userMenus: [],  // 当前用户菜单权限
  regions: [],  // 当前用户区域
  categories: []  // 新闻分类
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

export const setRegions = async (dispatch, getState) => {
  const { user } = getState().login;
  const req = {
    id: user.role.menus.includes('*') ? undefined : user.regionId
  };
  const res = await getRegions(req);
  const regions = res.data;

  dispatch({ type: 'main/SET_REGIONS', payload: regions });
};

export const setCategories = async dispatch => {
  const res = await getCategories();
  const categories = res.data;
  dispatch({ type: 'main/SET_CATEGORIES', payload: categories });
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
    case 'main/SET_REGIONS':
      return { ...state, regions: action.payload };
    case 'main/SET_CATEGORIES':
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}

export default mainReducer;