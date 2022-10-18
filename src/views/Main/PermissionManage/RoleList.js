import React, { useEffect, useState } from 'react';
import { Button, Modal, Popconfirm, Table, Form, Input, message } from 'antd';
import { KeyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import style from './RoleList.module.scss';
import { getRoles } from '@/api/userList';
import { addRole } from '@/api/roleList';

/**
 * 角色列表
 * @returns {React.ReactNode}
 */
function RoleList() {
  const [addForm] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const initDataSource = async () => {
    const res = await getRoles();
    const dataSource = res.data;
    setDataSource(dataSource);
  };

  const handleDel = () => {};

  const handleAddOk = async () => {
    const addFormData = await addForm.validateFields();
    await addRole(addFormData);
    message.success('添加角色成功');
    handleAddCancel();
    initDataSource();
  };

  const handleAddCancel = () => {
    addForm.resetFields();
    setIsAddModalOpen(false);
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
            icon={<KeyOutlined />}
          />
          <Popconfirm
            title={`你确定要删除“${row.name}”角色吗？`}
            onConfirm={() => handleDel(row)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              danger
              className="option__button"
              type="primary"
              shape="circle"
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
        onClick={() => setIsAddModalOpen(true)}
      >添加角色</Button>
      <Table
        pagination={{ pageSize: 5 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
      <Modal
        forceRender
        title="添加角色"
        okText="确定"
        cancelText="取消"
        open={isAddModalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form
          form={addForm}
          layout="vertical"
          name="addForm"
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[
              {
                required: true,
                message: '角色名称不能为空'
              }
            ]}
          >
            <Input maxLength={30} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default RoleList;