import { useHistory, useParams } from 'react-router-dom';
import { Descriptions, PageHeader } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import style from './NewsDetail.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { getNewsDetail } from '@/api/newsManage';
import { getRegions } from '@/api/regionList';
import { getOptionsLabel } from '@/utils';

function SubTitle({ text }) {
  return (
    <div className={style.newsSubTitle}>
      <span className="sub-title__text">{text}</span>
      <LikeOutlined className="sub-title__like-icon" />
    </div>
  );
}

function NewsDetail() {
  const params = useParams();
  const history = useHistory();
  const [news, setNews] = useState({});
  const [regions, setRegions] = useState([]);

  const initRegions = async () => {
    const res = await getRegions();

    const regions = res.data;

    setRegions(regions);
  };

  const initNews = useCallback(async () => {
    const res = await getNewsDetail(params.id, {
      _expand: ['category', 'user']
    });

    const news = res.data;

    setNews(news);
  }, [params.id]);

  useEffect(() => {
    initNews();
    initRegions();
  }, [initNews]);

  return (
    <div className={style.newsDetail}>
      <PageHeader
        className="news-detail__news-header"
        title={news.title}
        subTitle={<SubTitle text={news.category?.name} />}
        onBack={() => history.goBack()}
      />
      <Descriptions>
        <Descriptions.Item label="发布者">{news.user?.username}</Descriptions.Item>
        <Descriptions.Item label="区域">{getOptionsLabel(news.user?.regionId, regions, { labelKey: 'name', valueKey: 'id' })}</Descriptions.Item>
        <Descriptions.Item label="浏览量">{news.view}</Descriptions.Item>
        <Descriptions.Item label="点赞量">{news.star}</Descriptions.Item>
      </Descriptions>
      <div
        className="news-detail__news-content"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </div>
  );
}

export default NewsDetail;