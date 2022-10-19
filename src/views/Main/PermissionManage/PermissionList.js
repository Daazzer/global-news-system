import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Popconfirm, Table } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import style from './PermissionList.module.scss';
import { getAssembleTree } from '@/utils';

/**
 * 权限列表
 * @returns {React.ReactNode}
 */
function PermissionList() {
  const { allPermissions } = useSelector(state => state.main);
  const [dataSource, setDataSource] = useState([]);

  const handleDel = row => {
    
  };

  useEffect(() => {
    const dataSource = getAssembleTree(allPermissions);
    setDataSource(dataSource);
  }, [allPermissions]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '权限标识',
      dataIndex: 'key',
      key: 'key'
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
            icon={<PlusOutlined />}
          />
          <Button
            className="option__button"
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
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
      >添加权限</Button>
      <Table
        pagination={false}
        scroll={{ y: 480 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
    </div>
  );
}

export default PermissionList;