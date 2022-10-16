import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Spin,
  Layout
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Siderbar from '@/components/SiderBar';
import HeaderBar from '@/components/HeaderBar';
import Home from './Home';
import style from './index.module.scss';

const { Content } = Layout;

function Main() {
  const { loading } = useSelector(state => state.style);

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
        <Siderbar />
        <Layout className="site-layout">
          <HeaderBar />
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