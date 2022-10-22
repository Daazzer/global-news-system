import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, notification, Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { getNews, setNews } from '@/api/newsManage';
import { AuditState, Role } from '@/utils/enums';
import style from './AuditNews.module.scss';

function AuditNews() {
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

  const handleSubmit = async (row, auditState) => {
    await setNews(row.id, { auditState });

    const message = {
      [AuditState.APPROVED]: '已通过',
      [AuditState.UNAPPROVED]: '已驳回'
    }[auditState];
    
    const notificationOption = {
      message,
      description: '请到审核列表查看情况',
      placement: 'bottomRight'
    };
    
    notification.success(notificationOption);

    initDataSource();
  };

  useEffect(() => {
    initDataSource();
  }, [initDataSource]);


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
            icon={<CheckOutlined />}
            onClick={() => handleSubmit(row, AuditState.APPROVED)}
          >通过</Button>
          <Button
            className="option__button"
            type="primary"
            icon={<CloseOutlined />}
            danger
            onClick={() => handleSubmit(row, AuditState.UNAPPROVED)}
          >驳回</Button>
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

export default AuditNews;