import { useEffect, useState } from 'react';
import { Table, Switch, Button, Form } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getUsers } from '@/api/login';
import { setUser } from '@/api/user';
import { getOptionsLabel } from '@/utils';
import { DefaultUser, Region, UserState } from '@/utils/enums';
import UserModalForm from '@/components/UserModalForm';
import style from './UserList.module.scss';

function UserList() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('添加用户');

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
    } else {
      form.setFieldsValue(formData);
    }
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
      state: value ? UserState.ENABLED : UserState.DISABLED
    });

    initDataSource();
  };

  useEffect(() => {
    initDataSource();
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
            onClick={() => handleModalOpen('edit', row)}
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
        onClick={() => handleModalOpen('add')}
      >添加用户</Button>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
      <UserModalForm
        title={modalTitle}
        open={isModalOpen}
        form={form}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default UserList;