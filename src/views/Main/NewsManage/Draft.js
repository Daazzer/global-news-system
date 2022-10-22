import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, message, Popconfirm, Table } from 'antd';
import { EditOutlined, AuditOutlined, DeleteOutlined } from '@ant-design/icons';
import { delNews, getNews } from '@/api/newsManage';
import { AuditState, Role } from '@/utils/enums';
import style from './Draft.module.scss';

function Draft() {
  const history = useHistory();
  const { user } = useSelector(state => state.login);
  const [dataSource, setDataSource] = useState([]);

  const initDataSource = useCallback(async () => {
    const res = await getNews({
      auditState: AuditState.UNAUDITED,
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
  }, [initDataSource])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      key: 'title',
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
        <div className={style.option}>
          <Button
            className="option__button"
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => history.push(`/news-manage/news-edit/${row.id}`)}
          />
          <Button
            className="option__button"
            type="primary"
            shape="circle"
            icon={<AuditOutlined />}
            onClick={() => history.push(`/news-manage/news-edit/${row.id}`)}
          />
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
              shape="circle"
              icon={<DeleteOutlined />}
            />
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

export default Draft;