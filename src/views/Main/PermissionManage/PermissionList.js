import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popconfirm, Table, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import style from './PermissionList.module.scss';
import { getAssembleTree } from '@/utils';
import { setPermission } from '@/api/permissionList';
import { setAllPermissions } from '@/store/reducers/mainReducer';
import { PermissionState } from '@/utils/enums';

/**
 * 权限列表
 * @returns {React.ReactNode}
 */
function PermissionList() {
  const dispatch = useDispatch();
  const { permissions } = useSelector(state => state.main);
  const [dataSource, setDataSource] = useState([]);

  const handleStateChange = async (value, row) => {
    await setPermission(row.id, {
      state: value ? PermissionState.ENABLED : PermissionState.DISABLED
    });
    dispatch(setAllPermissions);
  };

  const handleDel = row => {

  };

  useEffect(() => {
    const dataSource = getAssembleTree(permissions);
    setDataSource(dataSource);
  }, [permissions]);

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
      title: '权限状态',
      dataIndex: 'state',
      key: 'state',
      render: (value, row) => <Switch
        checked={value}
        onChange={value => handleStateChange(value, row)}
      />
    },
    {
      title: '操作',
      key: 'option',
      width: 180,
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
    <div className={style.permissionList}>
      <Button
        className="permission-list__button"
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