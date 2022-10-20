import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Switch, Button, Form, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getUsers } from '@/api/login';
import { delUser, setUser } from '@/api/userList';
import { SystemDefault, SystemState } from '@/utils/enums';
import UserModalForm from '@/components/UserModalForm';
import style from './UserList.module.scss';

/**
 * 用户列表
 * @returns {React.ReactNode}
 */
function UserList() {
  const [userModalForm] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isUserModalFormOpen, setIsModalOpen] = useState(false);
  const [userModalFormState, setUserModalFormState] = useState('');
  const [userModalformData, setUserModalformData] = useState({});
  const { user } = useSelector(state => state.login);

  /** 初始化列表数据 */
  const initDataSource = useCallback(async () => {
    const res = await getUsers({ _expand: ['role', 'region'] });
    const { regionId, role: { menus } } = user;
    const dataSource = res.data.filter(item => {
      if (menus.includes('*')) {
        return true;
      }
      return item.regionId === regionId;
    });
    setDataSource(dataSource);
  }, [user]);

  const handleUserStateChange = async (value, row) => {
    await setUser({
      id: row.id,
      state: value ? SystemState.ENABLED : SystemState.DISABLED
    });

    initDataSource();
  };

  const handleUserModalFormOpen = (state, data = {}) => {
    const { roleId, regionId, username, password } = data;
    const formData = {
      username,
      password,
      regionId,
      roleId
    };
    userModalForm.setFieldsValue(formData);
    setUserModalFormState(state);
    setUserModalformData(data);
    setIsModalOpen(true);
  };

  const handleUserModalFormOk = () => {
    setIsModalOpen(false);
    setTimeout(initDataSource);
  };

  const handleDel = async row => {
    await delUser(row.id);
    initDataSource();
    message.success('删除用户成功');
  };

  useEffect(() => {
    initDataSource();
  }, [initDataSource]);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
      render: value => value?.name
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: value => value?.name
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render: (value, row) => (
        <Switch
          disabled={row.default === SystemDefault.YES}
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
            icon={<EditOutlined />}
            onClick={() => handleUserModalFormOpen('edit', row)}
          />
          <Popconfirm
            title={`你确定要删除用户“${row.username}”吗？`}
            onConfirm={() => handleDel(row)}
            okText="确定"
            cancelText="取消"
            disabled={row.default === SystemDefault.YES}
          >
            <Button
              danger
              className="option__button"
              type="primary"
              shape="circle"
              disabled={row.default === SystemDefault.YES}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
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
        onClick={() => handleUserModalFormOpen('add')}
      >添加用户</Button>
      <Table
        pagination={{ pageSize: 5 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
      <UserModalForm
        state={userModalFormState}
        open={isUserModalFormOpen}
        data={userModalformData}
        form={userModalForm}
        onOk={handleUserModalFormOk}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default UserList;