import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popconfirm, Table, Switch, Form, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { setAllMenus } from '@/store/reducers/mainReducer';
import { delMenu, setMenu } from '@/api/menuList';
import MenuModalForm from '@/components/MenuModalForm';
import { getAssembleTree } from '@/utils';
import { SystemState } from '@/utils/enums';
import style from './MenuList.module.scss';

/**
 * 菜单列表
 * @returns {React.ReactNode}
 */
function MenuList() {
  const dispatch = useDispatch();
  const [permissionModalForm] = Form.useForm();
  const { menus } = useSelector(state => state.main);
  const [dataSource, setDataSource] = useState([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [menuModalFormData, setMenuModalFormData] = useState({});
  const [permissionModalFormState, setMenuModalFormState] = useState('add');

  const handleStateChange = async (value, row) => {
    await setMenu(row.id, {
      state: value ? SystemState.ENABLED : SystemState.DISABLED
    });
    dispatch(setAllMenus);
  };

  const handleMenuModalFormOpen = (state, data) => {
    if (state === 'edit') {
      permissionModalForm.setFieldsValue({
        name: data.name,
        key: data.key
      });
    }

    if (data) {
      setMenuModalFormData(data);
    }

    setMenuModalFormState(state);
    setIsMenuModalOpen(true);
  };

  const handleMenuModalFormOk = () => {
    dispatch(setAllMenus);
    handleMenuModalFormCancel();
  };

  const handleMenuModalFormCancel = () => {
    permissionModalForm.resetFields();
    setMenuModalFormData({});
    setIsMenuModalOpen(false);
  };

  const handleDel = async row => {
    if (row.children) {
      message.error('当前权限存在子权限，请先把对应的子权限删除');
      return;
    }
    await delMenu(row.id);
    message.success('删除权限成功');
    dispatch(setAllMenus);
  };

  useEffect(() => {
    const dataSource = getAssembleTree(menus);
    setDataSource(dataSource);
  }, [menus]);

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
            onClick={() => handleMenuModalFormOpen('addSub', row)}
          />
          <Button
            className="option__button"
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleMenuModalFormOpen('edit', row)}
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
    <div className={style.menuList}>
      <Button
        className="menu-list__button"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleMenuModalFormOpen('add')}
      >添加权限</Button>
      <Table
        pagination={false}
        scroll={{ y: 480 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row.id}
      />
      <MenuModalForm
        open={isMenuModalOpen}
        data={menuModalFormData}
        form={permissionModalForm}
        state={permissionModalFormState}
        onOk={handleMenuModalFormOk}
        onCancel={handleMenuModalFormCancel}
      />
    </div>
  );
}

export default MenuList;