import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popconfirm, Table, Switch, Form, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { setAllMenus } from '@/store/reducers/mainReducer';
import { delMenu, setMenu } from '@/api/menuList';
import MenuModalForm from '@/components/MenuModalForm';
import { getAssembleTree } from '@/utils';
import { SystemDefault, SystemState } from '@/utils/enums';
import style from './MenuList.module.scss';

/**
 * 菜单列表
 * @returns {React.ReactNode}
 */
function MenuList() {
  const dispatch = useDispatch();
  const { menus } = useSelector(state => state.main);
  const [permissionModalForm] = Form.useForm();
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

  const handleMenuModalFormOpen = (state, data = {}) => {
    const formData = state === 'edit' ? {
      name: data.name,
      key: data.key
    } : {
      name: undefined,
      key: undefined
    };
    permissionModalForm.setFieldsValue(formData);
    setMenuModalFormData(data);
    setMenuModalFormState(state);
    setIsMenuModalOpen(true);
  };

  const handleMenuModalFormOk = () => {
    dispatch(setAllMenus);
    setIsMenuModalOpen(false);
  };

  const handleDel = async row => {
    if (row.children) {
      message.error('当前菜单存在子菜单，请先把对应的子菜单删除');
      return;
    }
    await delMenu(row.id);
    message.success('删除菜单成功');
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
      key: 'key',
      render: value => <Tag color="#1890ff">{value}</Tag>
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
            okText="确定"
            cancelText="取消"
            title={`你确定要删除“${row.name}”菜单吗？`}
            onConfirm={() => handleDel(row)}
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
    <div className={style.menuList}>
      <Button
        className="menu-list__button"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleMenuModalFormOpen('add')}
      >添加菜单</Button>
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
        onCancel={() => setIsMenuModalOpen(false)}
      />
    </div>
  );
}

export default MenuList;