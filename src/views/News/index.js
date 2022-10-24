import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Col, List, PageHeader, Pagination, Row } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { getNews } from '@/api/newsManage';
import { PublishState } from '@/utils/enums';
import style from './index.module.scss';

function News() {
  const history = useHistory();

  const [newsCategoryMap, setNewsCategoryMap] = useState({});

  const initDataSource = async () => {
    const res = await getNews({
      publishState: PublishState.PUBLISHED,
      _expand: 'category'
    });

    const { data } = res;
    const newsCategoryMap = _.groupBy(data, item => item.category.name);
    setNewsCategoryMap(newsCategoryMap);
  };

  useEffect(() => {
    initDataSource();
  }, []);

  return (
    <div className={style.news}>
      <PageHeader
        className="news-page-header"
        title="全球大新闻"
        subTitle="新闻列表"
        backIcon={<HomeOutlined />}
        onBack={() => history.push('/')}
      />
      <Row gutter={20}>
        {Object.entries(newsCategoryMap).map(([title, dataSource]) => (
          <Col key={title} span={8}>
            <Card
              title={title}
              hoverable
              bordered
            >
              <List
                dataSource={dataSource}
                pagination={{ pageSize: 3 }}
                renderItem={item => (
                  <List.Item>
                    {item.title}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default News;