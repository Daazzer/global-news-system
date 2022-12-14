import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spin, Layout } from 'antd';
import NProgress from 'nprogress';
import { LoadingOutlined } from '@ant-design/icons';
import Siderbar from '@/components/SiderBar';
import HeaderBar from '@/components/HeaderBar';
import ContentBar from '@/components/ContentBar';
import style from './index.module.scss';

function Main() {
  NProgress.start();
  const { loading } = useSelector(state => state.style);

  useEffect(() => {
    NProgress.done();
  });

  return (
    <Spin
      size="large"
      spinning={loading}
      wrapperClassName={style.loading}
      indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
    >
      <Layout className={style.main}>
        <Siderbar />
        <Layout>
          <HeaderBar />
          <ContentBar />
        </Layout>
      </Layout>
    </Spin>
  );
}

export default Main;