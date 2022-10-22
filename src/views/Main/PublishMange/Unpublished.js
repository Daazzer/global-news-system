import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, notification, Table } from 'antd';
import { getNews, setNews } from '@/api/newsManage';
import { AuditState, PublishState, Role } from '@/utils/enums';

function Unpublished() {
  const { user } = useSelector(state => state.login);
  const [dataSource, setDataSource] = useState([]);
  const initDataSource = useCallback(async () => {
    const res = await getNews({
      publishState: PublishState.UNPUBLISHED,
      auditState: AuditState.APPROVED,
      userId: user.roleId === Role.ADMIN ? undefined : user.id,
      _expand: ['user', 'category']
    });

    const dataSource = res.data;

    setDataSource(dataSource);
  }, [user]);

  const handlePublish = async row => {
    await setNews(row.id, { publishState: PublishState.PUBLISHED });
    notification.success({
      message: '发布成功',
      description: '您可以到已发布中查看情况',
      placement: 'bottomRight'
    });
    initDataSource();
  };

  useEffect(() => {
    initDataSource();
  }, [initDataSource]);

  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      key: 'title',
      render: (value, row) => <Link to={{
        pathname: `/news-manage/news-view/${row.id}`,
        state: { activePath: '/news-manage/news-add' }
      }}>{value}</Link>
    },
    {
      title: '作者',
      dataIndex: 'user',
      key: 'user',
      render: value => value?.username || ''
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: value => value?.name || ''
    },
    {
      title: '操作',
      key: 'option',
      render: row => (
        <div className="option">
          <Button
            className="option__button"
            type="primary"
            onClick={() => handlePublish(row)}
          >发布</Button>
        </div>
      )
    }
  ];

  return (
    <Table
      pagination={{ pageSize: 5 }}
      dataSource={dataSource}
      columns={columns}
      rowKey={row => row.id}
    />
  );
}

export default Unpublished;