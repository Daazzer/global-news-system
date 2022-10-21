import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Form, message } from 'antd';
import { KeyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import RoleModalForm from '@/components/RoleModalForm';
import MenusModalTree from '@/components/MenusModalTree';
import { SystemDefault } from '@/utils/enums';
import { getRoles } from '@/api/userList';
import { delRole } from '@/api/roleList';
import style from './RoleList.module.scss';

/**
 * 角色列表
 * @returns {React.ReactNode}
 */
function RoleList() {
  const [addForm] = Form.useForm();
  const [menusModalTreeData, setMenusModalTreeData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [isAddModalFormOpen, setIsAddModalFormOpen] = useState(false);
  const [isMenusModalOpen, setIsMenusModalOpen] = useState(false);

  const initDataSource = async () => {
    const res = await getRoles();
    const dataSource = res.data;
    setDataSource(dataSource);
  };

  const handleDel = async row => {
    await delRole(row.id);
    message.success('删除角色成功');
    initDataSource();
  };

  const handleAddOk = () => {
    initDataSource();
    handleAddCancel();
  };

  const handleAddCancel = () => {
    setIsAddModalFormOpen(false);
    addForm.resetFields();
  };

  const handleMenusModalTreeOpen = row => {
    setMenusModalTreeData(row);
    setIsMenusModalOpen(true);
  };

  const handleEditMenusOk = () => {
    setIsMenusModalOpen(false);
    initDataSource();
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
            disabled={row.default === SystemDefault.YES}
            icon={<KeyOutlined />}
            onClick={() => handleMenusModalTreeOpen(row)}
          />
          <Popconfirm
            title={`你确定要删除“${row.name}”角色吗？`}
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
      <MenusModalTree
        data={menusModalTreeData}
        open={isMenusModalOpen}
        onCheck={(checkedKeys, { halfCheckedKeys }) => setMenusModalTreeData({
          ...menusModalTreeData,
          menus: checkedKeys.concat(halfCheckedKeys)
        })}
        onOk={handleEditMenusOk}
        onCancel={() => setIsMenusModalOpen(false)}
      />
    </div>
  );
}

export default RoleList;