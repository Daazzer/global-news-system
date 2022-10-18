import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Form } from 'antd';
import { KeyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getRoles } from '@/api/userList';
import style from './RoleList.module.scss';
import RoleModalForm from '@/components/RoleModalForm';
import { Role } from '@/utils/enums';

/**
 * 角色列表
 * @returns {React.ReactNode}
 */
function RoleList() {
  const [addForm] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isAddModalFormOpen, setIsAddModalFormOpen] = useState(false);

  const initDataSource = async () => {
    const res = await getRoles();
    const dataSource = res.data;
    setDataSource(dataSource);
  };

  const handleDel = () => {};

  const handleAddOk = () => {
    initDataSource();
    handleAddCancel();
  };

  const handleAddCancel = () => {
    setIsAddModalFormOpen(false);
    addForm.resetFields();
  };

  useEffect(() => {
    initDataSource();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name'
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
            disabled={row.id === Role.ADMIN}
            icon={<KeyOutlined />}
          />
          <Popconfirm
            title={`你确定要删除“${row.name}”角色吗？`}
            onConfirm={() => handleDel(row)}
            okText="确定"
            cancelText="取消"
            disabled={row.id === Role.ADMIN}
          >
            <Button
              danger
              className="option__button"
              type="primary"
              shape="circle"
              disabled={row.id === Role.ADMIN}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <div className={style.roleList}>
      <Button
        className="role-list__button"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsAddModalFormOpen(true)}
      >添加角色</Button>
      <Table
        pagination={{ pageSize: 5 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
      <RoleModalForm 
        open={isAddModalFormOpen}
        form={addForm}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      />
    </div>
  );
}

export default RoleList;