import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, notification, Table, Tag } from 'antd';
import { getNews, setNews } from '@/api/newsManage';
import { AuditState, PublishState, Role } from '@/utils/enums';
import { getOptionsLabel } from '@/utils';
import style from './AuditList.module.scss';

function AuditList() {
  const history = useHistory();
  const { user } = useSelector(state => state.login);
  const [dataSource, setDataSource] = useState([]);

  const initDataSource = useCallback(async () => {
    const res = await getNews({
      auditState_ne: AuditState.UNAUDITED,
      userId: user.roleId === Role.ADMIN ? undefined : user.id,
      _expand: ['user', 'category']
    });

    const dataSource = res.data;

    setDataSource(dataSource);
  }, [user]);

  const handleNews = async row => {
    const { auditState, id } = row;

    switch (auditState) {
      case AuditState.AUDIT:
        await setNews(id, { auditState: AuditState.UNAUDITED });
        notification.success({
          message: '撤销成功',
          description: '请到草稿箱查看情况',
          placement: 'bottomRight'
        });
        break;
      case AuditState.UNAPPROVED:
        history.push(`/news-manage/news-edit/${id}`, { activePath: '/news-manage/news-add' });
        break;
      case AuditState.APPROVED:
        await setNews(id, { publishState: PublishState.PUBLISHED });
        notification.success({
          message: '发布成功',
          description: '请到已发布列表查看情况',
          placement: 'bottomRight'
        });
        break;
      default:
        break;
    }
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
      title: '审核状态',
      dataIndex: 'auditState',
      key: 'auditState',
      render: value => {
        const text = getOptionsLabel(value, AuditState.options) || '';
        const color = {
          [AuditState.AUDIT]: 'orange',
          [AuditState.APPROVED]: 'green',
          [AuditState.UNAPPROVED]: 'red'
        }[value];

        return (
          <Tag color={color}>{text}</Tag>
        );
      }
    },
    {
      title: '操作',
      key: 'option',
      render: row => {
        const text = {
          [AuditState.UNAPPROVED]: '修改',
          [AuditState.AUDIT]: '撤销',
          [AuditState.APPROVED]: '发布'
        }[row.auditState];
        return (
          <div className={style.option}>
            <Button
              className="option__button"
              type="primary"
              onClick={() => handleNews(row)}
            >{text}</Button>
          </div>
        );
      }
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

export default AuditList;