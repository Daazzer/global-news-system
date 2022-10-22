import { useEffect, useState } from 'react';
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
import { getAssembleTree } from '@/utils';
import logo from '@/assets/logo.svg';
import style from './index.module.scss';
import { setAllMenus } from '@/store/reducers/mainReducer';

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

const getItems = menus => {
  const fn = (menus, paths = []) => menus.reduce((items, menu) => {
    const { children, key, name: label } = menu;
    const item = {
      key,
      label,
      icon: iconMap[key]
    };

    if (children?.length) {
      item.children = fn(children, paths.concat(key));
    } else {
      const path = '/' + paths.concat(key).join('/');
      item.label = <Link to={path}>{label}</Link>;
    }

    return items.concat(item);
  }, []);

  return fn(menus);
};

const getKeys = location => {
  const keys = location.pathname.split('/');
  const openKeys = keys.filter((_, index) => index);
  const selectedKeys = [keys[keys.length - 1]];

  return {
    openKeys,
    selectedKeys
  };
};

function SiderBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { collapsed } = useSelector(state => state.style);
  const { userMenus } = useSelector(state => state.main);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const { openKeys, selectedKeys } = getKeys(location);
    setOpenKeys(state => openKeys.concat(state));
    setSelectedKeys(selectedKeys);
  }, [location]);

  useEffect(() => {
    dispatch(setAllMenus);
  }, [dispatch]);

  useEffect(() => {
    const userMenusTree = getAssembleTree(userMenus);
    const items = getItems(userMenusTree);
    setItems(items);
  }, [userMenus]);

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
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        items={items}
        onOpenChange={setOpenKeys}
      />
    </Sider>
  );
}

export default SiderBar;