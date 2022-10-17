import { useEffect, useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const iconMap = {
  home: <HomeOutlined />,
  'user-manage': <UserOutlined />,
  'permission-manage': <KeyOutlined />,
  'news-manage': <ProfileOutlined />,
  'audit-manage': <AuditOutlined />,
  'publish-manage': <CommentOutlined />
};

const getKeys = permissions => {
  // eslint-disable-next-line
  let currentLevelFirstNode = permissions.find(menu => menu.parentId === 0);
  let key = String(currentLevelFirstNode.id);
  let defaultOpenKeys = [];
  let defaultSelectedKeys = [];

  defaultOpenKeys.push(key);

  while (currentLevelFirstNode) {
    // eslint-disable-next-line
    currentLevelFirstNode = permissions.find(menu => menu.parentId === currentLevelFirstNode.id);
    key = String(currentLevelFirstNode?.id || '');

    if (key) {
      defaultOpenKeys.push(key);
    }
  }

  defaultSelectedKeys = defaultOpenKeys.filter((_, index) => index === defaultOpenKeys.length - 1);

  return {
    defaultOpenKeys,
    defaultSelectedKeys
  };
};

const getMenus = permissions => {
  const fn = (permissions, paths = []) => permissions.map(permission => {
    const { children, id, parentId, key, name: label } = permission;
    const menu = {
      key: String(id),
      label,
      icon: iconMap[key]
    };

    if (!parentId) {
      paths = [];
    }

    paths.push(key);

    if (children?.length) {
      menu.children = fn(children, paths);
    } else {
      const path = '/' + paths.join('/');
      menu.label = <Link to={path}>{label}</Link>;
      paths.pop();
    }

    return menu;
  });

  return fn(permissions);
};

function SiderBar() {
  const [menus, setMenus] = useState([]);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
  const { user } = useSelector(state => state.login);
  const { collapsed } = useSelector(state => state.style);
  const userPermissions = user?.role.permissions;
  const logoText = '全球新闻发布管理系统';

  const init = useCallback(async () => {
    const res = await getPermissions();
    const allPermissions = res.data;

    // 判断当前用户的权限
    const permissions = userPermissions.includes('*')
      ? allPermissions
      : allPermissions.filter(permission => userPermissions.includes(permission));

    const { defaultOpenKeys, defaultSelectedKeys } = getKeys(permissions);
    const menusTree = getAssembleTree(permissions);

    const menus = getMenus(menusTree);

    setDefaultSelectedKeys(defaultSelectedKeys);
    setDefaultOpenKeys(defaultOpenKeys);
    setTimeout(() => {
      setMenus(menus);
    });
  }, [userPermissions]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
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
      {menus.length && <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        items={menus}
      />}
    </Sider>
  );
}

export default SiderBar;