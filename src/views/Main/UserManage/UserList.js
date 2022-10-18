import { useEffect, useState } from 'react';
import { Table, Switch, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getUsers } from '@/api/login';
import { setUser } from '@/api/user';
import { getOptionsLabel } from '@/utils';
import { DefaultUser, Region } from '@/utils/enums';
import style from './UserList.module.scss';

function UserList() {
  const [dataSource, setDataSource] = useState([]);

  const init = async () => {
    const res = await getUsers();
    const dataSource = res.data;
    setDataSource(dataSource);
  };

  const handleUserStateChange = async (value, row) => {
    await setUser({
      id: row.id,
      state: value ? 1 : 0
    });

    init();
  };

  useEffect(() => {
    init();
  }, []);

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
      render: value => getOptionsLabel(value, Region.options)
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: value => value?.name
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render: (value, row) => (
        <Switch
          disabled={row.default === DefaultUser.YES}
          checked={value}
          onChange={value => handleUserStateChange(value, row)}
        />
      )
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
            disabled={row.default === DefaultUser.YES}
            icon={<EditOutlined />}
          />
          <Button
            danger
            className="option__button"
            type="primary"
            shape="circle"
            disabled={row.default === DefaultUser.YES}
            icon={<DeleteOutlined />}
          />
        </div>
      )
    }
  ];

  return (
    <div className={style.userList}>
      <Button
        className="user-list__button"
        type="primary"
        icon={<PlusOutlined />}
      >添加用户</Button>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
    </div>
  );
}

export default UserList;