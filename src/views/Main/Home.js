import { useState } from 'react';
import { Avatar, Card, Col, Drawer, List, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, PieChartOutlined } from '@ant-design/icons';
import CatetoryChart from '@/components/CatetoryChart';
import UserCatetoryChart from '@/components/UserCatetoryChart';

const { Meta } = Card;

function Home() {
  const [open, setOpen] = useState(false);

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="home">
      <Row gutter={20}>
        <Col span={8}>
          <Card title="用户最常浏览">
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item>{item}</List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多">
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item>{item}</List.Item>
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