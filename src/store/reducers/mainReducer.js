import { getPermissions } from '@/api/user';
import { PermissionState } from '@/utils/enums';

const initState = {
  permissions: [],  // 所有权限
  userPermissions: []  // 当前用户权限
};

export const setAllPermissions = async (dispatch, getState) => {
  const res = await getPermissions();
  const permissions = res.data;
  const { user } = getState().login;
  const rolePermissions = user?.role.permissions || [];
  // 判断当前用户的权限
  const userPermissions = permissions.filter(permission => {
    if (rolePermissions.includes('*')) return true;
    return (
      rolePermissions.includes(permission.id) &&
      permission.state === PermissionState.ENABLED
    );
  });

  dispatch({ type: 'main/SET_PERMISSIONS', payload: permissions });
  dispatch({ type: 'main/SET_USER_PERMISSIONS', payload: userPermissions });
};

/**
 * 后台主页模块
 * @param {object} state
 * @param {import("redux").Action} action
 * @returns {object}
 */
const mainReducer = (state = initState, action) => {
  switch (action.type) {
    case 'main/SET_PERMISSIONS':
      return { ...state, permissions: action.payload };
    case 'main/SET_USER_PERMISSIONS':
      return { ...state, userPermissions: action.payload };
    default:
      return state;
  }
}

export default mainReducer;