import { createElement } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  Spin,
  Layout
} from 'antd';
import {
  LoadingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import Home from './Home';
import style from './index.module.scss';

const { Header, Content } = Layout;

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
        <Sidebar />
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