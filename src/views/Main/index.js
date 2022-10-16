import { useSelector } from 'react-redux';
import { Spin, Layout } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Siderbar from '@/components/SiderBar';
import HeaderBar from '@/components/HeaderBar';
import ContentBar from '@/components/ContentBar';
import style from './index.module.scss';

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
          <ContentBar />
        </Layout>
      </Layout>
    </Spin>
  );
}

export default Main;