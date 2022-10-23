import { useEffect, useState } from 'react';
import { Avatar, Card, Col, Drawer, List, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, PieChartOutlined } from '@ant-design/icons';
import CatetoryChart from '@/components/CatetoryChart';
import UserCatetoryChart from '@/components/UserCatetoryChart';
import { getNews } from '@/api/newsManage';
import { PublishState } from '@/utils/enums';
import { Link } from 'react-router-dom';

const { Meta } = Card;

function Home() {
  const [open, setOpen] = useState(false);
  const [viewDataSource, setViewDataSource] = useState([]);
  const [starDataSource, setStarDataSource] = useState([]);

  const initViewDataSource = async () => {
    const res = await getNews({
      publishState: PublishState.PUBLISHED,
      _expand: 'category',
      _sort: 'view',
      _order: 'desc',
      limit: 6
    });
    const viewDataSource = res.data;
    setViewDataSource(viewDataSource);
  };

  const initStarDataSource = async () => {
    const res = await getNews({
      publishState: PublishState.PUBLISHED,
      _expand: 'category',
      _sort: 'star',
      _order: 'desc',
      limit: 6
    });
    const starDataSource = res.data;
    setStarDataSource(starDataSource);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    initViewDataSource();
    initStarDataSource();
  }, []);

  return (
    <div className="home">
      <Row gutter={20}>
        <Col span={8}>
          <Card title="用户最常浏览">
            <List
              dataSource={viewDataSource}
              renderItem={item => (
                <List.Item>
                  <Link to={`/news-manage/news-view/${item.id}`}>{item.title}</Link>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多">
            <List
              dataSource={starDataSource}
              renderItem={item => (
                <List.Item>
                  <Link to={`/news-manage/news-view/${item.id}`}>{item.title}</Link>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <PieChartOutlined key="chart" onClick={showDrawer} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </Col>
      </Row>
      <Drawer
        title="个人新闻分类"
        placement="right"
        width={600}
        onClose={onClose}
        open={open}
      >
        <UserCatetoryChart />
      </Drawer>
      <CatetoryChart />
    </div>
  );
}

export default Home;