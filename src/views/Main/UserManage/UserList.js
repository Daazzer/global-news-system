import { useEffect, useMemo, useState } from 'react';
import { Table, Switch, Button, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getUsers } from '@/api/login';
import { setUser } from '@/api/user';
import { getOptionsLabel } from '@/utils';
import { DefaultUser, Region, Role } from '@/utils/enums';
import style from './UserList.module.scss';
import { getRegions, getRoles } from '@/api/main';

const { Option } = Select;

function UserList() {
  const [dataSource, setDataSource] = useState([]);
  const [allRegions, setAllRegions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState(null);
  const [modalTitle, setModalTitle] = useState('添加用户');
  const [disabledRegion, setDisabledRegion] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const regions = useMemo(() => {
    return allRegions.filter(region => roleId === Role.ADMIN
      ? region.value === Region.GLOBAL
      : region.value !== Region.GLOBAL
    );
  }, [allRegions, roleId]);

  /** 初始化列表数据 */
  const initDataSource = async () => {
    const res = await getUsers();
    const dataSource = res.data;
    setDataSource(dataSource);
  };

  /** 初始化区域数据 */
  const initAllRegions = async () => {
    const res = await getRegions();
    const allRegions = res.data;
    setAllRegions(allRegions);
  };

  /** 初始化角色数据 */
  const initRoles = async () => {
    const res = await getRoles();
    const roles = res.data;
    setRoles(roles);
  };

  const handleUserStateChange = async (value, row) => {
    await setUser({
      id: row.id,
      state: value ? 1 : 0
    });

    initDataSource();
  };

  const handleRoleIdChange = value => {
    const isAdmin = value === Role.ADMIN;
    if (isAdmin) {
      form.setFieldValue('region', Region.GLOBAL);
    } else if (form.getFieldValue('region') === Region.GLOBAL) {
      form.setFieldValue('region', null);
    }
    setDisabledRegion(isAdmin);
    setRoleId(value);
  };

  const handleModalOpen = (type, data) => {
    setModalTitle(`${type === 'add' ? '添加' : '编辑'}用户`);
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    initDataSource();
    initAllRegions();
    initRoles();
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
        onClick={() => handleModalOpen('add')}
      >添加用户</Button>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
      <Modal
        getContainer={false}
        title={modalTitle}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          name="form"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              {
                required: true,
                message: '用户名不能为空'
              }
            ]}
          >
            <Input maxLength={30} />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '密码不能为空'
              }
            ]}
          >
            <Input type="password" maxLength={30} />
          </Form.Item>
          <Form.Item
            name="region"
            label="区域"
            rules={[
              {
                required: true,
                message: '区域不能为空'
              }
            ]}
          >
            <Select disabled={disabledRegion}>
              {regions.map(region =>
                <Option
                  key={region.id}
                  value={region.value}
                >{region.label}</Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="roleId"
            label="角色"
            rules={[
              {
                required: true,
                message: '角色不能为空'
              }
            ]}
          >
            <Select value={roleId} onChange={handleRoleIdChange}>
              {roles.map(role =>
                <Option
                  key={role.id}
                  value={role.id}
                >{role.name}</Option>
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserList;