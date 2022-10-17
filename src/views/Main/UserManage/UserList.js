import { useEffect, useState } from 'react';
import { Table, Switch } from 'antd';
import { getUsers } from '@/api/login';
import { setUser } from '@/api/user';

const pagination = {
  pageNum: 1,
  pageSize: 5
};

function UserList() {
  const [dataSource, setDataSource] = useState([]);
  const init = async (_page = pagination.pageNum, _limit = pagination.pageSize) => {
    const res = await getUsers({
      _page,
      _limit
    });
    pagination.pageNum = _page;
    const dataSource = res.data;
    setDataSource(dataSource);
  };

  const handleUserStateChange = async (value, row) => {
    const state = value ? 1 : 0;

    await setUser({
      id: row.id,
      state
    });

    init(pagination.pageNum);
  };

  useEffect(() => {
    init();
  }, []);

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
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
      render: (value, row) => <Switch
        checked={value}
        onChange={value => handleUserStateChange(value, row)}
      />
    },
    {
      title: '操作',
      key: 'action'
    }
  ];

  return (
    <div className="user-list">
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
        pagination={{
          pageSize: pagination.pageSize,
          onChange: init
        }}
      />
    </div>
  );
}

export default UserList;