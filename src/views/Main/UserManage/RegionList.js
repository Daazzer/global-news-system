import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Form, message, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getUsers } from '@/api/login';
import { delUser } from '@/api/userList';
import { SystemDefault } from '@/utils/enums';
import UserModalForm from '@/components/UserModalForm';
import style from './RegionList.module.scss';

/**
 * 区域列表
 * @returns {React.ReactNode}
 */
function RegionList() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('添加用户');
  const [userModalformData, setUserModalformData] = useState(null);
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

  const handleUserModalFormOpen = (type, data) => {
    const { roleId, regionId, username, password } = data || {};
    const formData = type === 'add' ? null : {
      username,
      password,
      regionId,
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

  const handleUserModalFormOk = () => {
    message.success(`${userModalformData ? '修改' : '添加'}用户成功`);
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '区域名',
      dataIndex: 'name',
      key: 'name',
      render: value => value?.label
    },
    {
      title: '操作',
      key: 'option',
      render: row => (
        <div className={style.option}>
          <Popconfirm
            title={`你确定要删除“${row.name}”区域吗？`}
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
    <div className={style.regionList}>
      <Button
        className="region-list__button"
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

export default RegionList;