import { useEffect, useState, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Layout,
  Menu,
  Tooltip
} from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  KeyOutlined,
  ProfileOutlined,
  AuditOutlined,
  CommentOutlined
} from '@ant-design/icons';
import { getPermissions } from '@/api/user';
import { getAssembleTree } from '@/utils';
import logo from '@/assets/logo.svg';
import style from './index.module.scss';

const { Sider } = Layout;
const logoText = '全球新闻发布管理系统';
const iconMap = {
  home: <HomeOutlined />,
  'user-manage': <UserOutlined />,
  'permission-manage': <KeyOutlined />,
  'news-manage': <ProfileOutlined />,
  'audit-manage': <AuditOutlined />,
  'publish-manage': <CommentOutlined />
};

const getMenus = permissions => {
  const fn = (permissions, paths = []) => permissions.map(permission => {
    const { children, key, name: label } = permission;
    const menu = {
      key,
      label,
      icon: iconMap[key]
    };

    if (children?.length) {
      menu.children = fn(children, paths.concat(key));
    } else {
      const path = '/' + paths.concat(key).join('/');
      menu.label = <Link to={path}>{label}</Link>;
    }

    return menu;
  });

  return fn(permissions);
};

const useKeys = () => {
  const location = useLocation();
  const keys = location.pathname.split('/');
  const defaultOpenKeys = keys.filter((_, index) => index);
  const selectedKeys = [keys[keys.length - 1]];

  return {
    defaultOpenKeys,
    selectedKeys
  };
};

function SiderBar() {
  const dispatch = useDispatch();
  const { defaultOpenKeys, selectedKeys } = useKeys();
  const [menus, setMenus] = useState([]);
  const { user } = useSelector(state => state.login);
  const { collapsed } = useSelector(state => state.style);

  const init = useCallback(async () => {
    const res = await getPermissions();
    const allPermissions = res.data;
    const userPermissions = user?.role.permissions || [];
    // 判断当前用户的权限
    const permissions = userPermissions.includes('*')
      ? allPermissions
      : allPermissions.filter(permission => userPermissions.includes(permission));
    const menusTree = getAssembleTree(permissions);
    const menus = getMenus(menusTree);

    dispatch({ type: 'main/SET_PERMISSIONS', payload: permissions });
    setMenus(menus);
  }, [user?.role.permissions, dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      className={style.sideBar}
    >
      <Tooltip
        placement="right"
        trigger={collapsed ? 'hover' : ''}
        title={logoText}
      >
        <NavLink
          to="/"
          className={[
            style.logo,
            collapsed ? style.logoCollapsed : ''
          ].join(' ')}
        >
          <img
            width="35"
            alt="logo"
            src={logo}
          />
          <span className={[
            style.logoText,
            collapsed ? style.logoTextCollapsed : ''
          ].join(' ')}>{logoText}</span>
        </NavLink>
      </Tooltip>
      <Menu
        theme="dark"
        mode="inline"
        className={style.sideBarMenu}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={selectedKeys}
        items={menus}
      />
    </Sider>
  );
}

export default SiderBar;