import { createElement } from 'react';
import {
  Switch,
  Route,
  Redirect,
  NavLink
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  Spin,
  Layout,
  Menu
} from 'antd';
import {
  LoadingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import logo from '@/assets/logo.svg'
import Home from './Home';
import style from './index.module.scss';

const { Header, Sider, Content } = Layout;

function Main() {
  const dispatch = useDispatch();
  const { loading, collapsed } = useSelector(state => state.style);
  const handleTriggerClick = () => dispatch({ type: 'style/TOGGLE_COLLAPSED' });

  return (
    <Spin
      size="large"
      style={{ maxHeight: '100%' }}
      spinning={loading}
      indicator={<LoadingOutlined
        style={{ fontSize: 32 }}
        spin
      />}
    >
      <Layout className={style.main}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <NavLink
            to="/"
            className={style.mainLogo}
          >
            <img
              width="35"
              alt="logo"
              src={logo}
            />
            <span className={style.mainLogoText}>全球新闻发布管理系统</span>
          </NavLink>
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
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className={style.mainBackground}
            style={{
              padding: 0
            }}
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: style.mainSideTrigger,
              onClick: handleTriggerClick,
            })}
          </Header>
          <Content
            className={style.mainBackground}
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home">
                <Home />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
}

export default Main;