import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popconfirm, Table, Switch, Form, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { setAllPermissions } from '@/store/reducers/mainReducer';
import { delPermission, setPermission } from '@/api/permissionList';
import PermissionModalForm from '@/components/PermissionModalForm';
import { getAssembleTree } from '@/utils';
import { PermissionState } from '@/utils/enums';
import style from './PermissionList.module.scss';

/**
 * 权限列表
 * @returns {React.ReactNode}
 */
function PermissionList() {
  const dispatch = useDispatch();
  const [permissionModalForm] = Form.useForm();
  const { permissions } = useSelector(state => state.main);
  const [dataSource, setDataSource] = useState([]);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [permissionModalFormData, setPermissionModalFormData] = useState({});
  const [permissionModalFormState, setPermissionModalFormState] = useState('add');

  const handleStateChange = async (value, row) => {
    await setPermission(row.id, {
      state: value ? PermissionState.ENABLED : PermissionState.DISABLED
    });
    dispatch(setAllPermissions);
  };

  const handlePermissionModalFormOpen = (state, data) => {
    if (state === 'edit') {
      permissionModalForm.setFieldsValue({
        name: data.name,
        key: data.key
      });
    }

    if (data) {
      setPermissionModalFormData(data);
    }

    setPermissionModalFormState(state);
    setIsPermissionModalOpen(true);
  };

  const handlePermissionModalFormOk = () => {
    dispatch(setAllPermissions);
    handlePermissionModalFormCancel();
  };

  const handlePermissionModalFormCancel = () => {
    permissionModalForm.resetFields();
    setPermissionModalFormData({});
    setIsPermissionModalOpen(false);
  };

  const handleDel = async row => {
    if (row.children) {
      message.error('当前权限存在子权限，请先把对应的子权限删除');
      return;
    }
    await delPermission(row.id);
    message.success('删除权限成功');
    dispatch(setAllPermissions);
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
            onClick={() => handlePermissionModalFormOpen('addSub', row)}
          />
          <Button
            className="option__button"
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handlePermissionModalFormOpen('edit', row)}
          />
          <Popconfirm
            title={`你确定要删除“${row.name}”权限吗？`}
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
        onClick={() => handlePermissionModalFormOpen('add')}
      >添加权限</Button>
      <Table
        pagination={false}
        scroll={{ y: 480 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
      <PermissionModalForm
        open={isPermissionModalOpen}
        data={permissionModalFormData}
        form={permissionModalForm}
        state={permissionModalFormState}
        onOk={handlePermissionModalFormOk}
        onCancel={handlePermissionModalFormCancel}
      />
    </div>
  );
}

export default PermissionList;