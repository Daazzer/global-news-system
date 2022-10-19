import React, { useEffect, useState } from 'react';
import { Table, Switch, Button, Form, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getUsers } from '@/api/login';
import { delUser, setUser } from '@/api/userList';
import { getOptionsLabel } from '@/utils';
import { SystemDefault, Region, SystemState } from '@/utils/enums';
import UserModalForm from '@/components/UserModalForm';
import style from './UserList.module.scss';

/**
 * 用户列表
 * @returns {React.ReactNode}
 */
function UserList() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('添加用户');
  const [userModalformData, setUserModalformData] = useState(null);

  const handleModalOpen = (type, data) => {
    const { roleId, region, username, password } = data || {};
    const formData = type === 'add' ? null : {
      username,
      password,
      region,
      roleId
    };
    setModalTitle(`${type === 'add' ? '添加' : '编辑'}用户`);
    setIsModalOpen(true);
    if (type === 'add') {
      form.resetFields();
      setUserModalformData(null);
    } else {
      form.setFieldsValue(formData);
      setUserModalformData(data);
    }
  };

  const handleDel = async row => {
    await delUser(row.id);
    initDataSource();
    message.success('删除用户成功');
  };

  /** 初始化列表数据 */
  const initDataSource = async () => {
    const res = await getUsers();
    const dataSource = res.data;
    setDataSource(dataSource);
  };

  const handleUserStateChange = async (value, row) => {
    await setUser({
      id: row.id,
      state: value ? SystemState.ENABLED : SystemState.DISABLED
    });

    initDataSource();
  };

  const handleUserModalFormOk = () => {
    message.success(`${userModalformData ? '修改' : '添加'}用户成功`);
    setIsModalOpen(false);
    initDataSource();
  };

  useEffect(() => {
    initDataSource();
  }, []);

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
      render: value => getOptionsLabel(value, Region.options)
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
            disabled={row.default === SystemDefault.YES}
            icon={<EditOutlined />}
            onClick={() => handleModalOpen('edit', row)}
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
        onClick={() => handleModalOpen('add')}
      >添加用户</Button>
      <Table
        pagination={{ pageSize: 5 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
      <UserModalForm
        title={modalTitle}
        open={isModalOpen}
        data={userModalformData}
        form={form}
        onOk={handleUserModalFormOk}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default UserList;