import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { KeyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Role } from '@/utils/enums';
import { getRoles } from '@/api/userList';
import style from './PermissionList.module.scss';

/**
 * 权限列表
 * @returns {React.ReactNode}
 */
function PermissionList() {
  const [dataSource, setDataSource] = useState([]);

  const initDataSource = async () => {
    const res = await getRoles();
    const dataSource = res.data;
    setDataSource(dataSource);
  };

  const handleDel = row => {};

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
      >添加权限</Button>
      <Table
        pagination={{ pageSize: 5 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
    </div>
  );
}

export default PermissionList;