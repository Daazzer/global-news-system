import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Layout,
  Menu,
  Tooltip
} from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import logo from '@/assets/logo.svg';
import style from './index.module.scss';

const { Sider } = Layout;

function Sidebar() {
  const { collapsed } = useSelector(state => state.style);
  const logoText = '全球新闻发布管理系统';

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
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3'
          },
        ]}
      />
    </Sider>
  );
}

export default Sidebar;