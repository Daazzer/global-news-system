import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, message, Popconfirm, Table } from 'antd';
import { delNews, getNews } from '@/api/newsManage';
import { AuditState, PublishState, Role } from '@/utils/enums';

function Revoked() {
  const { user } = useSelector(state => state.login);
  const [dataSource, setDataSource] = useState([]);
  const initDataSource = useCallback(async () => {
    const res = await getNews({
      publishState: PublishState.REVOKED,
      auditState: AuditState.APPROVED,
      userId: user.roleId === Role.ADMIN ? undefined : user.id,
      _expand: ['user', 'category']
    });

    const dataSource = res.data;

    setDataSource(dataSource);
  }, [user]);

  const handleDel = async row => {
    await delNews(row.id);
    message.success('删除新闻成功');
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
          <Popconfirm
            okText="确定"
            cancelText="取消"
            title={`你确定要删除新闻“${row.title}”吗？`}
            onConfirm={() => handleDel(row)}
          >
            <Button
              danger
              className="option__button"
              type="primary"
            >删除</Button>
          </Popconfirm>
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

export default Revoked;