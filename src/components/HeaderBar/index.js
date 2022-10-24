import { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.module.scss';

const { Header } = Layout;

function HeaderBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(state => state.login);
  const { collapsed } = useSelector(state => state.style);
  const handleTriggerClick = () => dispatch({ type: 'style/TOGGLE_COLLAPSED' });
  const handleLogout = () => {
    dispatch({ type: 'login/SET_USER', payload: null });
    history.replace('/login');
  };

  const menu = (
    <Menu
      items={[
        {
          label: <Link to="/news">游客系统</Link>,
          key: '0'
        },
        {
          label: '退出',
          danger: true,
          key: '1',
          onClick: handleLogout
        }
      ]}
    />
  );

  return (
    <Header className={style.headerBar}>
      {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: style.siderBarTrigger,
        onClick: handleTriggerClick,
      })}
      <div className={style.infoBar}>
        <div className="info-text">欢迎<span className={style.username}>{user?.username || 'unknown'}</span></div>
        <Dropdown
          trigger={['click']}
          overlay={menu}
        >
          <Avatar
            className={[style.avatar, 'info-text'].join(' ')}
            size="large"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
    </Header>
  );
}

export default HeaderBar;