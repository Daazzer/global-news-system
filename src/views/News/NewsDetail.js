import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions, PageHeader } from 'antd';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import style from './NewsDetail.module.scss';
import { getNewsDetail } from '@/api/newsManage';
import { getRegions } from '@/api/regionList';
import { setNews as setNewsReq } from '@/api/newsManage';
import { getOptionsLabel } from '@/utils';
import { setUser as setUserReq } from '@/api/userList';
import { setUser } from '@/store/reducers/loginReducer';

function SubTitle({ text, onLike, news }) {
  const { user } = useSelector(state => state.login);
  const isLike = useMemo(() => user.likes.includes(news.id), [user, news.id]);

  return (
    <div className={style.newsSubTitle}>
      <span className="sub-title__text">{text}</span>
      {isLike
        ? <LikeFilled className="sub-title__like-icon sub-title__like-icon--thumb-up" onClick={onLike} />
        : <LikeOutlined className="sub-title__like-icon" onClick={onLike} />}
    </div>
  );
}

function NewsDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const { user } = useSelector(state => state.login);
  const [news, setNews] = useState({});
  const [regions, setRegions] = useState([]);

  const initRegions = async () => {
    const res = await getRegions();

    const regions = res.data;

    setRegions(regions);
  };

  const initNews = useCallback(async () => {
    let res = await getNewsDetail(params.id, {
      _expand: ['category', 'user']
    });

    let news = res.data;

    if (!user.views.includes(news.id)) {
      await setNewsReq(news.id, { view: news.view + 1 });
      await setUserReq(user.id, { views: user.views.concat(news.id) });

      dispatch(setUser(user.id));

      res = await getNewsDetail(params.id, {
        _expand: ['category', 'user']
      });

      news = res.data;
    }

    setNews(news);
  }, [params.id, user, dispatch]);

  const handleLike = async () => {
    const newsReq = { like: news.like };
    const userReq = { likes: user.likes };
    if (user.likes.includes(news.id)) {
      newsReq.like--;
      userReq.likes = user.likes.filter(newsId => newsId !== news.id);
    } else {
      newsReq.like++;
      userReq.likes = user.likes.concat(news.id);
    }

    await setNewsReq(news.id, newsReq);
    await setUserReq(user.id, userReq);
    dispatch(setUser(user.id));
  };

  useEffect(() => {
    initNews();
    initRegions();
  }, [initNews]);

  return (
    <div className={style.newsDetail}>
      <PageHeader
        className="news-detail__news-header"
        title={news.title}
        subTitle={<SubTitle
          text={news.category?.name}
          news={news}
          onLike={handleLike}
        />}
        onBack={() => history.goBack()}
      />
      <Descriptions>
        <Descriptions.Item label="发布者">{news.user?.username}</Descriptions.Item>
        <Descriptions.Item label="区域">{getOptionsLabel(news.user?.regionId, regions, { labelKey: 'name', valueKey: 'id' })}</Descriptions.Item>
        <Descriptions.Item label="浏览量">{news.view}</Descriptions.Item>
        <Descriptions.Item label="点赞量">{news.like}</Descriptions.Item>
      </Descriptions>
      <div
        className="news-detail__news-content"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </div>
  );
}

export default NewsDetail;